import './SearchForm.css';
import { useEffect, useState } from 'react';

function SearchForm({ onSearchResults }) {
  const [inputValue, setInputValue] = useState('');
  const [isToggle, setIsToggle] = useState(false);

  function handleInputValue(evt) {
    setInputValue(evt.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    onSearchResults(inputValue, isToggle);
  }

  function handleToggle() {
    setIsToggle(!isToggle);
    localStorage.setItem('isToggle', JSON.stringify(!isToggle));
  };

  useEffect(() => {
    onSearchResults(inputValue, isToggle);
  }, [isToggle]);

  return (
    <form className="search">
      <div className="search__container">
        <input className="search__input" placeholder="Фильм" type="text" value={inputValue} onChange={handleInputValue} required />
        <button className="search__button" type="submit" onClick={handleSubmit}>
          <div className="search__button-bgr" />
        </button>
      </div>
      <div className="search__filter">
        <label className="search__tumbler">
          <input className="search__checkbox" type="checkbox" value={isToggle} onChange={handleToggle} />
          <span className="search__slider" />
        </label>
        <p className="search__tumbler-label">Короткометражки</p>
      </div>
    </form>
  );
};

export default SearchForm;
