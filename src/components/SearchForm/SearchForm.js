import './SearchForm.css';

function SearchForm() {
  return (
    <form className="search">
      <div className="search__container">
        <input className="search__input" placeholder="Фильм" type="text" required />
        <button className="search__button" type="submit">
          <div className="search__button-bgr" />
        </button>
      </div>
      <div className="search__filter">
        <label className="search__tumbler">
          <input className="search__checkbox" type="checkbox" />
          <span className="search__slider" />
        </label>
        <p className="search__tumbler-label">Короткометражки</p>
      </div>
    </form>
  );
};

export default SearchForm;
