import './Movies.css';
import React, { useEffect, useState } from 'react';
import SearchForm from '../SearchForm/SearchForm';
import Preloader from '../Preloader/Preloader';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import moviesApi from '../../utils/MoviesApi';
import mainApi from '../../utils/MainApi.js';
import {
  SHORT_MOVIE,
  WIDTH_SCREEN_DESKTOP,
  WIDTH_SCREEN_TABLET,
  WIDTH_SCREEN_MOBILE,
  QUANTITY_CARDS_DESKTOP,
  QUANTITY_CARDS_TABLET,
  QUANTITY_CARDS_MOBILE } from '../../utils/constants';

function Movies() {




  const [moviesSearchRequest, setMoviesSearchRequest] = useState('');
  const [moviesSearchResults, setMoviesSearchResults] = useState([]);
  const [shortMovies, setShortMovies] = useState([]);
  const [moviesToRender, setMoviesToRender] = useState([]);
  const [moviesRemains, setMoviesRemains] = useState([]);

  const [savedMovies, setSavedMovies] = useState([]);

  const [preloader, setPreloader] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [moviesToggle, setMoviesToggle] = useState(false);
  const [moviesCounter, setMoviesCounter] = useState([]);

  const [moviesWithToggle, setMoviesWithToggle] = useState([]);
  const [moviesToRenderWithToggle, setMoviesToRenderWithToggle] = useState([]);


  // ------------------------ НОВЫЙ КОД ------------------------
  // useEffect(() => {
  //   if (!moviesSearchRequest) {
  //     setMoviesToRender([]);
  //     setMoviesRemains([]);
  //   };
  // }, [moviesSearchRequest]);

  // function changeToggle (isToggle) {
  //   setMoviesToggle(isToggle);

  // }

  function getMovies(searchRequest, isToggle) {

    if (!searchRequest) {
      setErrorMessage('Введите поисковый запрос');
      return;
    }

    const allMovies = JSON.parse(localStorage.getItem("allMovies"));
    const moviesSearchResults = allMovies.filter((movie) => movie.nameRU.toLowerCase().includes(searchRequest.toLowerCase()));
    const shortMovies = moviesSearchResults.filter((movie) => {
      return movie.duration <= SHORT_MOVIE;
    });

    localStorage.setItem('moviesSearchRequest', searchRequest);
    localStorage.setItem('moviesSearchResults', JSON.stringify(moviesSearchResults));
    localStorage.setItem('shortMovies', JSON.stringify(shortMovies));

    setMoviesSearchRequest(searchRequest);
    setMoviesSearchResults(moviesSearchResults);
    setShortMovies(shortMovies);

    console.log('По поисковому запросу отфильтрованы фильмы, в т.ч. короткометражки. Добавлены в localStorage и в useState', searchRequest, moviesSearchResults, shortMovies);

    renderMovies(isToggle);
  }

  function renderMovies(isToggle) {
    if (moviesSearchResults) {
      if (isToggle) {
        setMoviesToRender(shortMovies);
      } else {
        let chunk = moviesSearchResults.splice(0, moviesCounter[0]);
        setMoviesToRender(chunk);
        setMoviesRemains(moviesSearchResults);
      };
    };
  };

  // ------------------------ КНОПКА ЕЩЕ ------------------------
  function renderMore() {
    if (moviesRemains) {
      let newMoviesRemains = moviesRemains;
      let newChunk = moviesToRender.concat(newMoviesRemains.splice(0, moviesCounter[1]));
      setMoviesToRender(newChunk);
      setMoviesRemains(newMoviesRemains);
    }
  }




  // function renderMore() {
  //   const newMoviesSearchResults = moviesSearchResults;
  //   const newMoviesToRender = moviesToRender.concat(newMoviesSearchResults.splice(0, moviesCounter[1]));
  //   setMoviesToRender(newMoviesToRender);
  //   setMoviesSearchResults(newMoviesSearchResults);
  // }



  // ------------------------ СТАРЫЙ КОД ------------------------

  // async function getMovies(searchRequest) {
  //   setMoviesToggle(false);
  //   localStorage.setItem('moviesToggle', false);

  //   if (!searchRequest) {
  //     setErrorMessage('Введите поисковый запрос');
  //     return false;
  //   }

  //   setErrorMessage('');
  //   setPreloader(true);

  //   try {
  //     // const data = await moviesApi.getAllMovies();
  //     const data = JSON.parse(localStorage.getItem("allMovies"));
  //     let filterData = data.filter((movie) => movie.nameRU.toLowerCase().includes(searchRequest.toLowerCase()));

  //     localStorage.setItem('moviesSearchResults', JSON.stringify(filterData));
  //     localStorage.setItem('moviesSearchRequest', searchRequest);

  //     const spliceData = filterData.splice(0, moviesCounter[0]);

  //     setMoviesToRender(spliceData);
  //     setMoviesToRenderWithToggle(spliceData);

  //     setMoviesSearchResults(filterData);
  //     setMoviesWithToggle(filterData);
  //   } catch (err) {
  //     setErrorMessage(
  //       'Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз'
  //     );

  //     setMoviesSearchResults([]);
  //     localStorage.removeItem('moviesSearchRequest');
  //     localStorage.removeItem('moviesSearchResults');
  //     localStorage.removeItem('moviesToggle');
  //   } finally {
  //     setPreloader(false);
  //   }
  // }

  // async function getShortMovies(isToggle) {
  //   let filterDataShowed = [];
  //   let filterData = [];

  //   if (isToggle) {
  //     setMoviesToRenderWithToggle(moviesToRender);
  //     setMoviesWithToggle(moviesSearchResults);
  //     filterDataShowed = moviesToRender.filter((movie) => movie.duration <= SHORT_MOVIE);
  //     filterData = moviesSearchResults.filter((movie) => movie.duration <= SHORT_MOVIE);
  //   } else {
  //     filterDataShowed = moviesToRenderWithToggle;
  //     filterData = moviesWithToggle;
  //   }

  //   localStorage.setItem('moviesSearchResults', JSON.stringify(filterDataShowed.concat(filterData)));
  //   localStorage.setItem('moviesToggle', isToggle);
  //   setMoviesToRender(filterDataShowed);
  //   setMoviesSearchResults(filterData);
  // }


  // ------------------------ ШИРИНА ЭКРАНА ------------------------

  useEffect(() => {
    getMoviesCounter();
    console.log('сработал useEffect для получения счетчика');
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
    return counter;
  }


  // ------------------------ СОХРАНЕННЫЕ ФИЛЬМЫ ------------------------

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
    // mainApi
    //   .getMovies()
    //   .then((data) => {
    //     setSavedMovies(data);
    //   })
    //   .catch((err) => {
    //     console.log(`Ошибка сервера при получении массива сохраненных фильмов: ${err}`);
    //   });

    const savedMovies = JSON.parse(localStorage.getItem("savedMovies"));
    setSavedMovies(savedMovies);

    // const localStorageMovies = localStorage.getItem('moviesSearchResults');

    // if (localStorageMovies) {
    //   const filterData = JSON.parse(localStorageMovies);
    //   setMoviesToRender(filterData.splice(0, moviesCounter[0]));
    //   setMoviesSearchResults(filterData);
    //   setPreloader(false);
    // }

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
        renderMovies={renderMovies}
        // onGetShortMovies={getShortMovies}
      />
      {errorMessage && <span className="movies__error-message">{errorMessage}</span>}
      {preloader && <Preloader />}
      {/* {!preloader && !errorMessage && moviesSearchResults !== null && savedMovies !== null && moviesToRender !== null && ( */}
      {moviesToRender && moviesRemains && moviesSearchRequest && (
        <MoviesCardList
          moviesToRender={moviesToRender}
          moviesRemains={moviesRemains}
          savedMoviesToggle={savedMoviesToggle}
          savedMovies={savedMovies}
          renderMore={renderMore}
        />
      )}
    </section>
  );
};

export default Movies;
