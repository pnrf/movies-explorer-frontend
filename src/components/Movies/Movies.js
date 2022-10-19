import './Movies.css';
import { useEffect, useState } from 'react';
import SearchForm from '../SearchForm/SearchForm';
import Preloader from '../Preloader/Preloader';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import moviesApi from '../../utils/MoviesApi';

function Movies() {
  const [preloader, setPreloader] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  async function handleSearchResults(InputValue, isToggle) {
    setPreloader(true);
    try {
    // get and filter movies arr
      let moviesArr = await moviesApi.getAllMovies();
      let moviesArrFiltered = moviesArr.filter((movie) => movie.nameRU.toLowerCase().includes(InputValue.toLowerCase()));
      let shortMoviesArrFiltered = moviesArrFiltered.filter((movie) => {
        return movie.duration <= 40;
      });

    // set data to localStorage
      localStorage.setItem('allFoundMovies', JSON.stringify(moviesArrFiltered));
      localStorage.setItem('shortFoundMovies', JSON.stringify(shortMoviesArrFiltered));
      localStorage.setItem('requestText', JSON.stringify(InputValue));
      localStorage.setItem('isToggle', JSON.stringify(isToggle));
    } catch (err) {
        setErrorMessage('Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз');
    } finally {
        setPreloader(false);
    }
  };

  return (
    <section className="movies">
      <SearchForm
        onSearchResults={handleSearchResults}
      />
      {errorMessage && <span className="movies__error-message">{errorMessage}</span>}
      {preloader ? <Preloader /> : <MoviesCardList />}
    </section>
  );
};

export default Movies;
