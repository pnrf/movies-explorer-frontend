import './SearchForm.css';
import React, { useEffect, useState } from 'react';

function SearchForm({ onGetMovies, moviesToggle, moviesSearchRequest, onGetShortMovies }) {
  const [searchRequest, setSearchRequest] = useState('');
  const [isToggle, setIsToggle] = useState(false);

  function handleSearchRequest(evt) {
    setSearchRequest(evt.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    onGetMovies(searchRequest, isToggle);
  }

  function handleToggle() {
    const foo = !isToggle;
    setIsToggle(foo);
    onGetShortMovies(foo);
  };

  useEffect(() => {
    setIsToggle(moviesToggle);
    setSearchRequest(moviesSearchRequest);
  }, [moviesToggle, moviesSearchRequest]);

  return (
    <form className="search">
      <div className="search__container">
        <input className="search__input" placeholder="Фильм" type="text" value={searchRequest} onChange={handleSearchRequest} required />
        <button className="search__button" type="submit" onClick={handleSubmit}>
          <div className="search__button-bgr" />
        </button>
      </div>
      <div className="search__filter">
        <label className="search__toggle">
          <input className="search__checkbox" type="checkbox" value={isToggle} checked={isToggle} onChange={handleToggle} />
          <span className="search__slider" />
        </label>
        <p className="search__toggle-label">Короткометражки</p>
      </div>
    </form>
  );
};

export default SearchForm;
