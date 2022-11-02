import './Movies.css';
import React, { useEffect, useState } from 'react';
import SearchForm from '../SearchForm/SearchForm';
import Preloader from '../Preloader/Preloader';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import mainApi from '../../utils/MainApi.js';
import { SHORT_MOVIE, MOVIES_COUNTER_OBJ } from '../../utils/constants';

function Movies(isLoggedIn, isLoading) {

  const [moviesToRender, setMoviesToRender] = useState([]);
  const [moviesRemains, setMoviesRemains] = useState([]);
  const [savedMovies, setSavedMovies] = useState([]);

  const [preloader, setPreloader] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isToggle, setIsToggle] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);

  const [moviesCounter, setMoviesCounter] = useState([]);

  // -------------- СЛЕПОК ЭКРАНА (РЕЗУЛЬТАТОВ ПОИСКА) -----------------

  useEffect(() => {
    const savedMovies = JSON.parse(localStorage.getItem("savedMovies"));
    if (savedMovies !== null) {
      setSavedMovies(savedMovies);
    };

    const localStorageMoviesSearchRequest = localStorage.getItem('moviesSearchRequest');

    let localStorageMoviesToggle;
    if (localStorage.getItem('isToggle') === 'true') {
      localStorageMoviesToggle = true;
    } else if (localStorage.getItem('isToggle') === 'false') {
      localStorageMoviesToggle = false;
    } else {
      console.log('Сохраненных в localStorage результатов поиска нет. Пользователь еще ничего не искал');
    };

    if (localStorageMoviesSearchRequest) {
      getMovies(localStorageMoviesSearchRequest, localStorageMoviesToggle);
    };
  }, []);

    // ---------------- ПОИСК И ОТОБРАЖЕНИЕ ФИЛЬМОВ -------------------

  function getMovies(searchRequest, isToggle) {
    setErrorMessage('');

    if (!searchRequest) {
      setErrorMessage('Введите поисковый запрос');
      return;
    }

    const initialMovies = JSON.parse(localStorage.getItem("allMovies"));

    if (initialMovies === null) {
      return setErrorMessage('При получении массива фильмов что-то пошло не так')
    };

    const moviesSearchResults = initialMovies.filter((movie) => movie.nameRU.toLowerCase().includes(searchRequest.toLowerCase()));
    const shortMovies = moviesSearchResults.filter((movie) => {
      return movie.duration <= SHORT_MOVIE;
    });

    localStorage.setItem('moviesSearchRequest', searchRequest);
    localStorage.setItem('moviesSearchResults', JSON.stringify(moviesSearchResults));
    localStorage.setItem('shortMovies', JSON.stringify(shortMovies));
    localStorage.setItem('isToggle', isToggle);

    setIsToggle(isToggle);

    if (isToggle) {
      if (shortMovies.length > 0) {
        setMoviesToRender(shortMovies);
      } else {
        setErrorMessage('Среди фильмов нет короткометражек, соответствующих вашему запросу.');
      }
    } else {
      if (moviesSearchResults.length > 0) {
        const newMoviesSearchResults = moviesSearchResults;
        const chunk = newMoviesSearchResults.slice(0, moviesCounter[0]);
        setMoviesToRender(chunk);
        setMoviesRemains(newMoviesSearchResults.slice(moviesCounter[0]));
      } else {
        setErrorMessage('Среди фильмов нет ни одного фильма, соответствующего вашему запросу.');
      }
    };
  };

  // -------------------------- КНОПКА ЕЩЕ ------------------------
  function renderMore() {
    if (moviesRemains) {
      let newMoviesRemains = moviesRemains;
      let newChunk = moviesToRender.concat(newMoviesRemains.splice(0, moviesCounter[1]));
      setMoviesToRender(newChunk);
      setMoviesRemains(newMoviesRemains);
    }
  }

  // ------------------------ ШИРИНА ЭКРАНА ------------------------

  useEffect(() => {
    setMoviesCounter(getMoviesCounter());
    const handlerResize = () => setMoviesCounter(getMoviesCounter());
    window.addEventListener('resize', handlerResize);

    return () => {
      window.removeEventListener('resize', handlerResize);
    };
  }, []);

  function getMoviesCounter() {
    let countCards;
    const clientWidth = document.documentElement.clientWidth;

    Object.keys(MOVIES_COUNTER_OBJ)
      .sort((a, b) => a - b)
      .forEach((key) => {
        if (clientWidth > +key) {
          countCards = MOVIES_COUNTER_OBJ[key];
        }
      });

    return countCards;
  }

  // -------------- ДОБАВЛЕНИЕ и УДАЛЕНИЕ СОХРАНЕННЫХ ФИЛЬМОВ ------------------------

  async function savedMoviesToggle(movie, isSelected) {
    if (isSelected) {
      try {
        await mainApi.addMovies(movie);
        let newSavedMovies = await mainApi.getMovies();
        setSavedMovies(newSavedMovies);
        localStorage.setItem('savedMovies', JSON.stringify(newSavedMovies));
      } catch (err) {
        console.log(`При добавлении фильма что-то пошло не так. Ошибка: ${err}`);
      }
    } else {
      try {
        await mainApi.deleteMovies(movie._id);
        let newSavedMovies = await mainApi.getMovies();
        setSavedMovies(newSavedMovies);
        localStorage.setItem('savedMovies', JSON.stringify(newSavedMovies));
      } catch (err) {
        console.log(`При удалении фильма что-то пошло не так. Ошибка: ${err}`);
      }
    }
  }

  return (
    <section className="movies">
      <SearchForm
        onGetMovies={getMovies}
        isDisabled={isDisabled}
      />
      {errorMessage && <span className="movies__error-message">{errorMessage}</span>}
      {preloader && <Preloader />}
      {!preloader && !errorMessage && moviesToRender !== null && moviesToRender.length > 0 && (
        <MoviesCardList
          moviesToRender={moviesToRender}
          moviesRemains={moviesRemains}
          savedMoviesToggle={savedMoviesToggle}
          savedMovies={savedMovies}
          renderMore={renderMore}
          isToggle={isToggle}
        />
      )}
    </section>
  );
};

export default Movies;
