import './App.css';
import { useEffect, useState } from 'react';
import { Routes, Route, useLocation, Navigate, redirect } from "react-router-dom";
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
import Preloader from '../Preloader/Preloader';
import MainApi from '../../utils/MainApi';
import Token from '../../utils/jwt';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState({});
  const { pathname } = useLocation();

  useEffect(() => {
    getUserInfo();
  }, []);

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
        console.log(`Ошибка регистрации: ${err}`);
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
        console.log(`Ошибка авторизации: ${err}`);
      });
  };

  const onLogout = () => {
    Token.removeToken();
    setIsLoggedIn(false);
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
