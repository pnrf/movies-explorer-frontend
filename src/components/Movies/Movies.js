import './Movies.css';
import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import SearchForm from '../SearchForm/SearchForm';
import Preloader from '../Preloader/Preloader';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import mainApi from '../../utils/MainApi.js';
import {
  SHORT_MOVIE,
  WIDTH_SCREEN_DESKTOP,
  WIDTH_SCREEN_TABLET,
  WIDTH_SCREEN_MOBILE,
  QUANTITY_CARDS_DESKTOP,
  QUANTITY_CARDS_TABLET,
  QUANTITY_CARDS_MOBILE } from '../../utils/constants';

function Movies(isLoggedIn, isLoading) {
  const navigate = useNavigate();

  const [moviesToRender, setMoviesToRender] = useState([]);

  const [moviesSearchRequest, setMoviesSearchRequest] = useState('');
  const [moviesSearchResults, setMoviesSearchResults] = useState([]);
  const [shortMovies, setShortMovies] = useState([]);

  const [moviesRemains, setMoviesRemains] = useState([]);

  const [savedMovies, setSavedMovies] = useState([]);

  const [preloader, setPreloader] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isToggle, setIsToggle] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);

  // const [moviesToggle, setMoviesToggle] = useState(false);
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
      console.log('При восстановлении результатов поиска после перезагрузки страницы что-то пошло не так');
    };

    if (localStorageMoviesSearchRequest) {
      setMoviesSearchRequest(localStorageMoviesSearchRequest);
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

    setMoviesSearchRequest(searchRequest);
    setMoviesSearchResults(moviesSearchResults);
    setShortMovies(shortMovies);
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

  function renderMovies(isToggle, searchRequest) {
    setErrorMessage('');
    setIsToggle(isToggle);

    if (!searchRequest && isToggle) {
      setErrorMessage('Подсказка: по вашему запросу в результатах поиска отобразятся только короткометражки');
    } else if (!searchRequest && !isToggle) {
      setErrorMessage('Подсказка: по вашему запросу в результатах поиска отобразятся все фильмы, имеющиеся в нашей базе данных');
    } else if (searchRequest && isToggle) {
        if (shortMovies.length > 0) {
          setMoviesToRender(shortMovies);
        } else {
          setErrorMessage('Среди фильмов нет короткометражек, соответствующих вашему запросу');
        }
    } else if (searchRequest && !isToggle) {
        if (moviesSearchResults.length > 0) {
          const copiedChunk = moviesSearchResults.slice(0, moviesCounter[0]);
          setMoviesToRender(copiedChunk);
          setMoviesRemains(moviesSearchResults.slice(moviesCounter[0]));
        } else {
          setErrorMessage('Среди фильмов нет ни одного фильма, соответствующего вашему запросу');
        }
    } else {
      setErrorMessage('Что-то пошло не так...');
    }
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
    getMoviesCounter();
  }, []);

  function getMoviesCounter() {
    const screenWidth = document.documentElement.clientWidth;
    let counter;

    if (screenWidth >= WIDTH_SCREEN_MOBILE && screenWidth < WIDTH_SCREEN_TABLET) {
      counter = QUANTITY_CARDS_MOBILE;
    } else if (screenWidth >= WIDTH_SCREEN_TABLET && screenWidth < WIDTH_SCREEN_DESKTOP) {
      counter = QUANTITY_CARDS_TABLET;
    } else {
      counter = QUANTITY_CARDS_DESKTOP;
    };

    setMoviesCounter(counter);
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
        // moviesToggle={moviesToggle}
        moviesSearchRequest={moviesSearchRequest}
        renderMovies={renderMovies}
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
