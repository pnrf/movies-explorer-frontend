import './MoviesCard.css';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';

function MoviesCard({ film }) {
  const { pathname } = useLocation();
  const [select, setSelect] = useState(false);

  const toggleFilmSelector = () => {
    if (select === false) {
      setSelect(true);
    } else {
        setSelect(false);
    }
  };

  const changeDurationFormat = (mins) => {
    return `${Math.floor(mins / 60)}ч ${mins % 60}м`;
  };

  return (
    <li className="card">
      <a className="card__image-content" href={film.trailerLink} target="_blank" rel="noreferrer">
        <img className="card__image" src={`https://api.nomoreparties.co${film.image.url}`} alt={film.nameRU}></img>
      </a>
      <div className="card__element">
        <p className="card__title">{film.nameRU}</p>
        {pathname === '/saved-movies'
          ? (<button type="button" className="card__button-delete" />)
          : (<button type="button" className={`card__button card__button${select && '_active'}`} onClick={toggleFilmSelector} />)
        }
      </div>
      <p className="card__duration">{changeDurationFormat(film.duration)}</p>
    </li>
  );
};

export default MoviesCard;
