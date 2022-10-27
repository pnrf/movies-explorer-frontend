import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';
import { useLocation } from 'react-router-dom';

function MoviesCardList({
  moviesToRender,
  moviesRemains,
  savedMoviesToggle,
  savedMovies,
  renderMore,
  isToggle }) {

  const { pathname } = useLocation();

  console.log('MoviesCardList ---- moviesToRender', moviesToRender);

  return (
    <section className="cards">
      <ul className="cards__list">
        {moviesToRender.length > 0
          ? (moviesToRender.map(movie => (<MoviesCard key={movie.id || movie.movieId} movie={movie} savedMoviesToggle={savedMoviesToggle} savedMovies={savedMovies}/>)))
          : (<span className="cards__message">К сожалению, по вашему запросу ничего не найдено</span>)
        }
      </ul>

     {moviesRemains.length > 0 && isToggle === false && pathname !== '/saved-movies'
        && (<button className="cards__button" type="button" name="more" onClick={renderMore}>Ещё</button>)
      }
    </section>
  );
};

export default MoviesCardList;
