import './MoviesCard.css';
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function MoviesCard({ movie, savedMoviesToggle, savedMovies }) {
  const { pathname } = useLocation();
  const [isSelect, setIsSelect] = useState(false);

  const toggleMovieSelector = () => {
    const selected = !isSelect;
    const savedMovie = savedMovies.filter(obj => {
      return obj.movieId == movie.id;
    });
    savedMoviesToggle({ ...movie, _id: savedMovie.length > 0 ? savedMovie[0]._id : null}, selected);
  };

  const deleteSelectedMovie = () => {
    savedMoviesToggle(movie, false);
  };

  const changeDurationFormat = (mins) => {
    return `${Math.floor(mins / 60)}ч ${mins % 60}м`;
  };

  useEffect(() => {
    if (pathname !== '/saved-movies') {
      const savedMovie = savedMovies.filter((obj) => {
        return obj.movieId == movie.id;
      });

      if (savedMovie.length > 0) {
        setIsSelect(true);
      } else {
        setIsSelect(false);
      }
    }
  }, [pathname, savedMovies, movie.id]);

  return (
    <li className="card">
      <a className="card__image-content" href={pathname === '/saved-movies' ? movie.trailer : movie.trailerLink} target="_blank" rel="noreferrer">
        <img className="card__image" src={pathname === '/saved-movies' ? `${movie.image}` : `https://api.nomoreparties.co/${movie.image.url}`} alt={movie.nameRU}></img>
      </a>
      <div className="card__element">
        <p className="card__title">{movie.nameRU}</p>
        {pathname === '/saved-movies'
          ? (<button type="button" className="card__button-delete" onClick={deleteSelectedMovie} />)
          : (<button type="button" className={`card__button ${isSelect && 'card__button_active'}`} onClick={toggleMovieSelector} />)
        }
      </div>
      <p className="card__duration">{changeDurationFormat(movie.duration)}</p>
    </li>
  );
};

export default MoviesCard;
