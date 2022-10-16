import './App.css';
import { useState } from 'react';
import { Routes, Route, Navigate, useLocation } from "react-router-dom";

import Header from '../Header/Header';
import Main from '../Main/Main';
import Login from '../Login/Login';
import Register from '../Register/Register';
import Footer from '../Footer/Footer';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { pathname } = useLocation();

  // Временные функции для проверки верстки
  // --- НАЧАЛО ---
  const LoggedInTrue = () => {
    setIsLoggedIn(true);
  };
  const LoggedInFalse = () => {
    setIsLoggedIn(false);
  }
  // --- КОНЕЦ ---

  return (
    <div className="App">

    {/* Временный блок. Убрать на следующем этапе (при реализации функционала) */}
    {/* НАЧАЛО */}
      <p>Для проверки верстки (isLoggedIn):
        <button type="button" onClick={LoggedInTrue}>TRUE</button>
        <button type="button" onClick={LoggedInFalse}>FALSE</button>
      </p>
    {/* КОНЕЦ */}

      {pathname === '/profile' || pathname === '/signin' || pathname === '/signup' ? '' : <Header isLoggedIn={isLoggedIn} />}

      <Routes>
        <Route exact path="/" element={<Main />}/>
        {/* <Route path="/movies" element={<Movies />}/> */}
        {/* <Route path="/saved-movies" element={<SavedMovies />}/> */}
        {/* <Route path="/profile" element={<Profile />}/> */}
        <Route path="/signin" element={<Login />}/>
        <Route path="/signup" element={<Register />}/>
        {/* <Route path="*" element={<Navigate to={isLoggedIn ? "/movies" : "/"}/>} /> */}
      </Routes>

      {pathname === '/profile' || pathname === '/signin' || pathname === '/signup' ? '' : <Footer />}
    </div>
  );
};

export default App;
