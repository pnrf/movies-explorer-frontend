import './App.css';
import { Routes, Route, Navigate } from "react-router-dom";

import Main from '../Main/Main';
import Footer from '../Footer/Footer';

function App() {
  return (
    <div className="App">
      {/* <Header /> */}

      <Routes>
        <Route exact path="/" element={<Main />}/>
        {/* <Route path="/movies" element={<Movies />}/>
        <Route path="/saved-movies" element={<SavedMovies />}/>
        <Route path="/profile" element={<Profile />}/>
        <Route path="/signin" element={<Login />}/>
        <Route path="/signup" element={<Register />}/>
        <Route path="*" element={<Navigate to={isLoggedIn ? "/movies" : "/"}/>} /> */}
      </Routes>

      <Footer />
    </div>
  );
};

export default App;
