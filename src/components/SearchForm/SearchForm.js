import './SearchForm.css';
import React, { useEffect, useState } from 'react';

function SearchForm({ onGetMovies, moviesToggle, moviesSearchRequest, renderMovies, isDisabled }) {
  const [searchRequest, setSearchRequest] = useState('');
  const [isToggle, setIsToggle] = useState(false);

  function handleSearchRequest(evt) {
    setSearchRequest(evt.target.value);
    console.log('сработала функция handleSearchRequest. setSearchRequest:', searchRequest);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    console.log('сработала функция handleSubmit. Будет вызвана функция onGetMovies', searchRequest, isToggle);
    onGetMovies(searchRequest, isToggle);
    // setIsToggle(evt.target.checkbox.value);
  }

  function handleToggle() {
    const isToggleValue = !isToggle;
    setIsToggle(isToggleValue);
    renderMovies(isToggleValue, searchRequest);
    console.log ('сработала функция handle Toggle и renderMovies(foo)', isToggle, searchRequest);
  };

  return (
    <form className="search" onSubmit={handleSubmit} noValidate>
      <label className="search__container">
        <input className="search__input" placeholder="Фильм" name="search" type="text"  onChange={handleSearchRequest} disabled={isDisabled} required />
        <button className="search__button" type="submit" disabled={isDisabled}>
          <div className="search__button-bgr" />
        </button>
      </label>
      <div className="search__filter">
        <label className="search__toggle">
          <input className="search__checkbox" name="checkbox" type="checkbox" value={isToggle} checked={isToggle} onChange={handleToggle} disabled={isDisabled}/>
          <span className="search__slider" />
        </label>
        <p className="search__toggle-label">Короткометражки</p>
      </div>
    </form>
  );
};

export default SearchForm;
