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

  const [preloader, setPreloader] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
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
      const initialSavedMovies = JSON.parse(localStorage.getItem("savedMovies"));
      if (initialSavedMovies.length === 0) {
        setErrorMessage('У вас нет сохраненных фильмов. Подберите что-нибудь интересное на странице Фильмы');
        setIsDisabled(true);
      } else if (initialSavedMovies.length > 0) {
        setSavedMovies(initialSavedMovies);
        setIsDisabled(false);

        if (isToggle) {
          setSavedMoviesToRender(initialSavedMovies.filter((movie) => {
            return movie.duration <= SHORT_MOVIE;
          }));
        } else {
          setSavedMoviesToRender(initialSavedMovies);
        };

      } else {
        setErrorMessage('При получении массива сохраненных фильмов что-то пошло не так');
      }

      return;
    }

    if (savedMovies === null) {
      return setErrorMessage('При получении массива сохраненных фильмов что-то пошло не так')
    };

    const savedMoviesSearchResults = savedMovies.filter((movie) => movie.nameRU.toLowerCase().includes(searchRequest.toLowerCase()));
    const shortSavedMovies = savedMoviesSearchResults.filter((movie) => {
      return movie.duration <= SHORT_MOVIE;
    });

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

    // ------------------------ УДАЛЕНИЕ СОХРАНЕННЫХ ФИЛЬМОВ ------------------------

  async function savedMoviesToggle(movie, isSelected) {
    setErrorMessage('');

    if (!isSelected) {
      try {
        await mainApi.deleteMovies(movie._id);
        const newSavedMovies = await mainApi.getMovies();
        localStorage.setItem('savedMovies', JSON.stringify(newSavedMovies));
        setSavedMovies(newSavedMovies);
        setSavedMoviesToRender(newSavedMovies);
      } catch (err) {
        console.log(`При удалении фильма что-то пошло не так. Ошибка: ${err}`);
      }
    }
  }

  return (
    <section className="saved-movies">
      <SearchForm
        onGetMovies={getSavedMovies}
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
          isToggle={false}
        />
      )}
    </section>
  );
};

export default SavedMovies;
