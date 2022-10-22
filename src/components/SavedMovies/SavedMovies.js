import './SavedMovies.css';
import React, { useEffect, useState } from 'react';
import SearchForm from '../SearchForm/SearchForm';
import Preloader from '../Preloader/Preloader';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import mainApi from '../../utils/MainApi';

function SavedMovies() {
  const [moviesSearchResults, setMoviesSearchResults] = useState(null);
  const [preloader, setPreloader] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [moviesToggle, setMoviesToggle] = useState(false);
  const [moviesSearchRequest, setMoviesSearchRequest] = useState('');
  const [moviesToRender, setMoviesToRender] = useState([]);

  async function handleGetMovies(searchRequest, isToggle) {
    setErrorMessage('');
    setPreloader(true);

    try {
      const data = moviesSearchResults;
      let filterData = data.filter((movie) => movie.nameRU.toLowerCase().includes(searchRequest.toLowerCase()));

      if (isToggle) {
        filterData = filterData.filter((movie) => movie.duration <= 40)
      };

      setMoviesToRender(filterData);

      if (searchRequest) {
        localStorage.setItem('savedMovies', JSON.stringify(filterData));
        localStorage.setItem('savedMoviesToggle', isToggle);
        localStorage.setItem('savedMoviesSearchRequest', searchRequest);
      } else {
        localStorage.removeItem('savedMovies');
        localStorage.removeItem('savedMoviesToggle');
        localStorage.removeItem('savedMoviesSearchRequest');
      }
    } catch (err) {
      setErrorMessage(
        'Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз'
      );

      setMoviesSearchResults([]);
      localStorage.removeItem('savedMovies');
      localStorage.removeItem('savedMoviesToggle');
      localStorage.removeItem('savedMoviesSearchRequest');
    } finally {
      setPreloader(false);
    }
  }

  async function savedMoviesToggle(movie, isToggle) {
    if (!isToggle) {
      try {
        await mainApi.deleteMovies(movie._id);
        const newMovies = await mainApi.getMovies();
        setMoviesToRender(newMovies);
        setMoviesSearchResults(newMovies);
      } catch (err) {
        console.log(`При удалении фильма что-то пошло не так. Ошибка: ${err}`);
      }
    }
  }

  useEffect(() => {
    async function fetchData() {
      const localStorageMovies = localStorage.getItem('savedMovies');
      if (localStorageMovies) {
        setMoviesSearchResults(JSON.parse(localStorageMovies));
        const localStorageMoviesToggle = localStorage.getItem('savedMoviesToggle');
        const localStorageMoviesSearchRequest = localStorage.getItem('savedMoviesSearchRequest');

        if (localStorageMoviesToggle) {
          setMoviesToggle(localStorageMoviesToggle === 'true');
        }
        if (localStorageMoviesSearchRequest) {
          setMoviesSearchRequest(localStorageMoviesSearchRequest);
        }
      } else {
        try {
          const data = await mainApi.getMovies();
          setMoviesSearchResults(data);
          setMoviesToRender(data);
        } catch (err) {
          console.log(`При получении данных из localStorage возникла ошибка: ${err}`);
        }
      }
    };
    fetchData();
  }, []);

  return (
    <section className="saved-movies">
      <SearchForm
        onGetMovies={handleGetMovies}
        moviesToggle={moviesToggle}
        moviesSearchRequest={moviesSearchRequest}
      />
      {errorMessage && <div className="saved-movies__error-message">{errorMessage}</div>}
      {preloader && <Preloader />}
      {!preloader && !errorMessage && moviesSearchResults !== null && (
        <MoviesCardList
          moviesRemains={[]}
          savedMoviesToggle={savedMoviesToggle}
          moviesToRender={moviesToRender}
        />
      )}
    </section>
  );
};

export default SavedMovies;
