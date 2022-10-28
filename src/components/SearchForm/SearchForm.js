import './SearchForm.css';
import React, { useEffect, useState } from 'react';

function SearchForm({
  onGetMovies,
  renderMovies,
  isDisabled }) {

  const [searchRequest, setSearchRequest] = useState('');
  const [isToggle, setIsToggle] = useState(false);

  useEffect(() => {
    const localStorageMoviesToggle = localStorage.getItem('isToggle');
    const localStorageMoviesSearchRequest = localStorage.getItem('moviesSearchRequest');

    setSearchRequest(localStorageMoviesSearchRequest);

    if (localStorageMoviesToggle && localStorageMoviesSearchRequest) {
      if (localStorageMoviesToggle === 'true') {
        setIsToggle(true);
      } else {
        setIsToggle(false);
      };
    };
  }, [])

  function handleSearchRequest(evt) {
    setSearchRequest(evt.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    setIsToggle(isToggle);
    onGetMovies(searchRequest, isToggle);
    // setIsToggle(evt.target.checkbox.value);
  }

  function handleToggle() {
    const isToggleValue = !isToggle;
    setIsToggle(isToggleValue);
    renderMovies(isToggleValue, searchRequest);
  };

  return (
    <form className="search" onSubmit={handleSubmit} noValidate>
      <label className="search__container">
        <input className="search__input" placeholder="Фильм" name="search" type="text" value={searchRequest || ''} onChange={handleSearchRequest} disabled={isDisabled} required />
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
