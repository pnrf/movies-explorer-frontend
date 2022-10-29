import './App.css';
import { useEffect, useState } from 'react';
import { Routes, Route, useLocation, useNavigate, Navigate, redirect } from "react-router-dom";
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Login from '../Login/Login';
import Register from '../Register/Register';
import Footer from '../Footer/Footer';
import NotFoundPage from '../NotFoundPage/NotFoundPage';
import MainApi from '../../utils/MainApi';
import MoviesApi from '../../utils/MoviesApi';
import Token from '../../utils/jwt';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import { BAD_REQUEST_ERROR, CONFLICT_ERROR } from '../../utils/constants';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState({});
  const { pathname } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn) {
      setIsLoading(true);
      Promise.all([MainApi.getUserInfo(), MainApi.getMovies(), MoviesApi.getAllMovies()])
        .then(([userInfo, savedMovies, allMovies]) => {
          setCurrentUser(userInfo);
          localStorage.setItem('allMovies', JSON.stringify(allMovies))
          localStorage.setItem('savedMovies', JSON.stringify(savedMovies));
        })
        .catch((err) => {
          console.log(`Не удалось получить данные пользователя, массив всех фильмов и список сохраненных фильмов. Ошибка: ${err}`);
          alert('Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте еще раз');
        })
        .finally(() => setIsLoading(false));
    }
  }, [isLoggedIn]);

  useEffect(() => {
    // if (isLoggedIn) {
      MainApi
        .checkToken(Token.checkToken())
        .then((res) => {
          if (res) {
            setIsLoggedIn(true);
            console.log('Токен проверен. Все в порядке');
          }
        })
        .catch((err) => {
          console.log("Что-то не так с токеном. Убедитесь, что вы авторизованы. Ошибка:", err);
          setIsLoggedIn(false);
        });
    // };
  }, [navigate]);

  const getUserInfo = () => {
    MainApi
      .getUserInfo()
      .then(data => {
        setCurrentUser(data);
        setIsLoggedIn(true);
      })
      .catch(err => {
        console.log(`Не удалось получить данные пользователя. Ошибка сервера: ${err}`);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  const onRegister = (data) => {
    MainApi
      .registerUser(data)
      .then (res => {
        if (res._id) {
          onLogin(data);
          console.log(`Регистрация прошла успешно!`);
        }
      })
      .catch(err => {
        if (CONFLICT_ERROR) {
          alert('Пользователь с таким email уже зарегистрирован');
        } else {
          alert(`Ошибка регистрации: ${err}`);
        }
      });
  };

  const onLogin = (data) => {
    MainApi
      .loginUser(data)
      .then(({ token }) => {
        if (token) {
          Token.setToken(token);
          MainApi.updateToken();
          setIsLoggedIn(true);
          getUserInfo();
          console.log(`Вы успешно вошли в систему!`);
          redirect('/movies');
        }
      })
      .catch(err => {
        if (BAD_REQUEST_ERROR) {
          alert('Указан неверный email или пароль.');
        } else {
          alert(`Ошибка авторизации: ${err}`);
        }
      });
  };

  const onLogout = () => {
    Token.removeToken();
    setIsLoggedIn(false);
    setCurrentUser({});
    localStorage.clear();
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="App">
        {pathname === '/signin' || pathname === '/signup' ? '' : <Header isLoggedIn={isLoggedIn} />}

        <Routes>
          <Route exact path="/" element={<Main />}/>
          <Route path="/movies" element={<ProtectedRoute component={Movies} isLoggedIn={isLoggedIn} isLoading={isLoading}/>}/>
          <Route path="/saved-movies" element={<ProtectedRoute component={SavedMovies} isLoggedIn={isLoggedIn} isLoading={isLoading}/>}/>
          <Route path="/profile" element={<ProtectedRoute component={Profile} isLoggedIn={isLoggedIn} isLoading={isLoading} onLogout={onLogout}/>}/>
          <Route path="/signin" element={isLoggedIn ? <Navigate to="/movies" /> : <Login onLogin={onLogin}/>}/>
          <Route path="/signup" element={isLoggedIn ? <Navigate to="/movies" /> : <Register onRegister={onRegister}/>}/>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>

        {pathname === '/profile' || pathname === '/signin' || pathname === '/signup' ? '' : <Footer />}
      </div>
    </CurrentUserContext.Provider>
  );
};

export default App;
