import './SavedMovies.css';
import React, { useEffect, useState } from 'react';
import SearchForm from '../SearchForm/SearchForm';
import Preloader from '../Preloader/Preloader';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import mainApi from '../../utils/MainApi';
import { SHORT_MOVIE } from '../../utils/constants';

function SavedMovies(isLoggedIn, isLoading) {

  const [savedMovies, setSavedMovies] = useState([]);
  const [savedMoviesToRender, setSavedMoviesToRender] = useState([]);

  const [savedMoviesSearchRequest, setSavedMoviesSearchRequest] = useState('');
  const [savedMoviesSearchResults, setSavedMoviesSearchResults] = useState([]);
  const [shortSavedMovies, setShortSavedMovies] = useState([]);

  const [preloader, setPreloader] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  // const [isToggle, setIsToggle] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);

  // -------------- ИЗНАЧАЛЬНОЕ ОТОБРАЖЕНИЕ СОХРАНЕННЫХ ФИЛЬМОВ -----------------

  useEffect(() => {
    const initialSavedMovies = JSON.parse(localStorage.getItem("savedMovies"));
    if (initialSavedMovies.length === 0) {
      setErrorMessage('У вас нет сохраненных фильмов. Подберите что-нибудь интересное на странице Фильмы');
      setIsDisabled(true);
    } else if (initialSavedMovies.length > 0) {
      setSavedMovies(initialSavedMovies);
      setSavedMoviesToRender(initialSavedMovies);
      setIsDisabled(false);
    } else {
      setErrorMessage('При получении массива сохраненных фильмов что-то пошло не так');
    }
  }, []);

  // ---------------- ПОИСК И ОТОБРАЖЕНИЕ СОХРАНЕННЫХ ФИЛЬМОВ -------------------

  function getSavedMovies(searchRequest, isToggle) {
    setErrorMessage('');

    if (!searchRequest) {
      setErrorMessage('Введите поисковый запрос или перезагрузите страницу.');
      return;
    }

    if (savedMovies === null) {
      return setErrorMessage('При получении массива сохраненных фильмов что-то пошло не так')
    };

    const savedMoviesSearchResults = savedMovies.filter((movie) => movie.nameRU.toLowerCase().includes(searchRequest.toLowerCase()));
    const shortSavedMovies = savedMoviesSearchResults.filter((movie) => {
      return movie.duration <= SHORT_MOVIE;
    });

    setSavedMoviesSearchRequest(searchRequest);
    setSavedMoviesSearchResults(savedMoviesSearchResults);
    setShortSavedMovies(shortSavedMovies);
    // setIsToggle(isToggle);

    if (isToggle) {
      if (shortSavedMovies.length > 0) {
        setSavedMoviesToRender(shortSavedMovies);
      } else {
        setErrorMessage('Среди сохраненных фильмов нет короткометражек, соответствующих вашему запросу');
      }
    } else {
      if (savedMoviesSearchResults.length > 0) {
        setSavedMoviesToRender(savedMoviesSearchResults);
      } else {
        setErrorMessage('Среди сохраненных фильмов нет ни одного фильма, соответствующего вашему запросу');
      }
    };
  };

  function renderShortSavedMovies(isToggle, searchRequest) {
    setErrorMessage('');
    // setIsToggle(isToggle);

    if (!searchRequest && isToggle) {
      setSavedMoviesToRender(savedMovies.filter((movie) => {
        return movie.duration <= SHORT_MOVIE;
      }));
    } else if (!searchRequest && !isToggle) {
      setSavedMoviesToRender(savedMovies);
    } else if (searchRequest && isToggle) {
        if (shortSavedMovies.length > 0) {
          setSavedMoviesToRender(shortSavedMovies);
        } else {
          setErrorMessage('Среди сохраненных фильмов нет короткометражек, соответствующих вашему запросу');
        }
    } else if (searchRequest && !isToggle) {
        if (savedMoviesSearchResults.length > 0) {
          setSavedMoviesToRender(savedMoviesSearchResults);
        } else {
          setErrorMessage('Среди сохраненных фильмов нет ни одного фильма, соответствующего вашему запросу');
        }
    } else {
      setErrorMessage('Что-то пошло не так...');
    }
  };

    // ------------------------ УДАЛЕНИЕ СОХРАНЕННЫХ ФИЛЬМОВ ------------------------

  async function savedMoviesToggle(movie, isToggle) {
    setErrorMessage('');

    if (!isToggle) {
      try {
        await mainApi.deleteMovies(movie._id);
        const newSavedMovies = await mainApi.getMovies();
        localStorage.setItem('savedMovies', JSON.stringify(newSavedMovies));
        setSavedMovies(newSavedMovies);
        setSavedMoviesToRender(newSavedMovies);
        setSavedMoviesSearchResults(newSavedMovies);
        setShortSavedMovies(newSavedMovies.filter((movie) => {
          return movie.duration <= SHORT_MOVIE;
        }));
      } catch (err) {
        console.log(`При удалении фильма что-то пошло не так. Ошибка: ${err}`);
      }
    }
  }

  return (
    <section className="saved-movies">
      <SearchForm
        onGetMovies={getSavedMovies}
        renderMovies={renderShortSavedMovies}
        isDisabled={isDisabled}
      />
      {errorMessage && <div className="saved-movies__error-message">{errorMessage}</div>}
      {preloader && <Preloader />}
      {!preloader && !errorMessage && savedMoviesToRender && (
        <MoviesCardList
          moviesToRender={savedMoviesToRender}
          moviesRemains={[]}
          savedMoviesToggle={savedMoviesToggle}
          savedMovies={savedMovies}
        />
      )}
    </section>
  );
};

export default SavedMovies;
