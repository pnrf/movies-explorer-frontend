import './Movies.css';
import React, { useEffect, useState } from 'react';
import SearchForm from '../SearchForm/SearchForm';
import Preloader from '../Preloader/Preloader';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import moviesApi from '../../utils/MoviesApi';
import mainApi from '../../utils/MainApi.js';

function Movies() {
  const [moviesSearchResults, setMoviesSearchResults] = useState(null);
  const [moviesSearchRequest, setMoviesSearchRequest] = useState('');
  const [savedMovies, setSavedMovies] = useState(null);
  const [preloader, setPreloader] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [moviesToggle, setMoviesToggle] = useState(false);
  const [moviesCounter, setMoviesCounter] = useState([]);
  const [moviesToRender, setMoviesToRender] = useState(null);
  const [moviesWithToggle, setMoviesWithToggle] = useState([]);
  const [moviesToRenderWithToggle, setMoviesToRenderWithToggle] = useState([]);

  useEffect(() => {
    getMoviesCounter();
  }, []);

  function getMoviesCounter() {
    const screenWidth = document.documentElement.clientWidth;
    let counter;

    if (screenWidth < 768) {
      counter = [5, 2];
    } else if (screenWidth >= 768 && screenWidth < 1280) {
      counter = [8, 2];
    } else {
      counter = [12, 4];
    };

    setMoviesCounter(counter);
    return counter;
  }

  function renderMore() {
    const newMoviesSearchResults = moviesSearchResults;
    const newMoviesToRender = moviesToRender.concat(newMoviesSearchResults.splice(0, moviesCounter[1]));
    setMoviesToRender(newMoviesToRender);
    setMoviesSearchResults(newMoviesSearchResults);
  }

  async function getMovies(searchRequest) {
    setMoviesToggle(false);
    localStorage.setItem('moviesToggle', false);

    if (!searchRequest) {
      setErrorMessage('Введите поисковый запрос');
      return false;
    }

    setErrorMessage('');
    setPreloader(true);

    try {
      const data = await moviesApi.getAllMovies();
      let filterData = data.filter((movie) => movie.nameRU.toLowerCase().includes(searchRequest.toLowerCase()));

      localStorage.setItem('moviesSearchResults', JSON.stringify(filterData));
      localStorage.setItem('moviesSearchRequest', searchRequest);

      const spliceData = filterData.splice(0, moviesCounter[0]);

      setMoviesToRender(spliceData);
      setMoviesToRenderWithToggle(spliceData);

      setMoviesSearchResults(filterData);
      setMoviesWithToggle(filterData);
    } catch (err) {
      setErrorMessage(
        'Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз'
      );

      setMoviesSearchResults([]);
      localStorage.removeItem('moviesSearchRequest');
      localStorage.removeItem('moviesSearchResults');
      localStorage.removeItem('moviesToggle');
    } finally {
      setPreloader(false);
    }
  }

  async function getShortMovies(isToggle) {
    let filterDataShowed = [];
    let filterData = [];

    if (isToggle) {
      setMoviesToRenderWithToggle(moviesToRender);
      setMoviesWithToggle(moviesSearchResults);
      filterDataShowed = moviesToRender.filter((movie) => movie.duration <= 40);
      filterData = moviesSearchResults.filter((movie) => movie.duration <= 40);
    } else {
      filterDataShowed = moviesToRenderWithToggle;
      filterData = moviesWithToggle;
    }

    localStorage.setItem('moviesSearchResults', JSON.stringify(filterDataShowed.concat(filterData)));
    localStorage.setItem('moviesToggle', isToggle);
    setMoviesToRender(filterDataShowed);
    setMoviesSearchResults(filterData);
  }

  async function savedMoviesToggle(movie, isSelected) {
    if (isSelected) {
      try {
        await mainApi.addMovies(movie);
        let newSavedMovies = await mainApi.getMovies();
        setSavedMovies(newSavedMovies);
      } catch (err) {
        console.log(`При добавлении фильма что-то пошло не так. Ошибка: ${err}`);
      }
    } else {
      try {
        await mainApi.deleteMovies(movie._id);
        let newSavedMovies = await mainApi.getMovies();
        setSavedMovies(newSavedMovies);
      } catch (err) {
        console.log(`При удалении фильма что-то пошло не так. Ошибка: ${err}`);
      }
    }
  }

  useEffect(() => {
    mainApi
      .getMovies()
      .then((data) => {
        setSavedMovies(data);
      })
      .catch((err) => {
        console.log(`Ошибка сервера при получении массива сохраненных фильмов: ${err}`);
      });

    const localStorageMovies = localStorage.getItem('moviesSearchResults');

    if (localStorageMovies) {
      const filterData = JSON.parse(localStorageMovies);
      setMoviesToRender(filterData.splice(0, moviesCounter[0]));
      setMoviesSearchResults(filterData);
      setPreloader(false);
    }

    const localStorageMoviesToggle = localStorage.getItem('moviesToggle');
    const localStorageMoviesSearchRequest = localStorage.getItem('moviesSearchRequest');

    if (localStorageMoviesToggle) {
      setMoviesToggle(localStorageMoviesToggle === 'true');
    }

    if (localStorageMoviesSearchRequest) {
      setMoviesSearchRequest(localStorageMoviesSearchRequest);
    }
  }, []);

  return (
    <section className="movies">
      <SearchForm
        onGetMovies={getMovies}
        moviesToggle={moviesToggle}
        moviesSearchRequest={moviesSearchRequest}
        onGetShortMovies={getShortMovies}
      />
      {errorMessage && <span className="movies__error-message">{errorMessage}</span>}
      {preloader && <Preloader />}
      {!preloader && !errorMessage && moviesSearchResults !== null && savedMovies !== null && moviesToRender !== null && (
        <MoviesCardList
          moviesToRender={moviesToRender}
          savedMoviesToggle={savedMoviesToggle}
          savedMovies={savedMovies}
          moviesRemains={moviesSearchResults}
          renderMore={renderMore}
        />
      )}
    </section>
  );
};

export default Movies;
