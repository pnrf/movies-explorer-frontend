import './SearchForm.css';
import React, { useEffect, useState } from 'react';
import { useLocation } from "react-router-dom";

function SearchForm({
  onGetMovies,
  isDisabled }) {
  const { pathname } = useLocation();

  const [searchRequest, setSearchRequest] = useState('');
  const [searchRequestSavedMovies, setSearchRequestSavedMovies ] = useState('');
  const [isToggle, setIsToggle] = useState(false);

  useEffect(() => {

    setIsToggle(false);

    if (pathname !== '/saved-movies') {
      setSearchRequest('');
      const localStorageMoviesToggle = localStorage.getItem('isToggle');
      const localStorageMoviesSearchRequest = localStorage.getItem('moviesSearchRequest');

      if (localStorageMoviesToggle && localStorageMoviesSearchRequest) {
        setSearchRequest(localStorageMoviesSearchRequest);

        if (localStorageMoviesToggle === 'true') {
          setIsToggle(true);
        } else {
          setIsToggle(false);
        };
      };
    };
  }, [])

  function handleSearchRequest(evt) {
    if (pathname === '/saved-movies') {
      setSearchRequestSavedMovies(evt.target.value);
    } else {
      setSearchRequest(evt.target.value);
    };
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    setIsToggle(isToggle);
    if (pathname === '/saved-movies') {
      onGetMovies(searchRequestSavedMovies, isToggle);
    } else {
      onGetMovies(searchRequest, isToggle);
    };
  }

  function handleToggle() {
    const isToggleValue = !isToggle;
    setIsToggle(isToggleValue);
  };

  useEffect(() => {
    if (pathname === '/saved-movies') {
      onGetMovies(searchRequestSavedMovies, isToggle);
    } else if (pathname === '/movies' && searchRequest.length > 0){
      onGetMovies(searchRequest, isToggle);
    };
  }, [isToggle]);

  return (
    <form className="search" onSubmit={handleSubmit} noValidate>
      <label className="search__container">
        <input className="search__input" placeholder="Фильм" name="search" type="text" value={pathname === '/saved-movies' ? searchRequestSavedMovies : searchRequest || ''} onChange={handleSearchRequest} disabled={isDisabled} required />
        <button className="search__button" type="submit" disabled={isDisabled}>
          <div className="search__button-bgr" />
        </button>
      </label>
      <div className="search__filter">
        <label className="search__toggle">
          <input className="search__checkbox" name="checkbox" type="checkbox" checked={isToggle} onChange={handleToggle} disabled={isDisabled}/>
          <span className="search__slider" />
        </label>
        <p className="search__toggle-label">Короткометражки</p>
      </div>
    </form>
  );
};

export default SearchForm;
