import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';

import MoviesDB from '../../utils/MoviesDB'; //временный массив с фильмами

function MoviesCardList() {

  return (
    <section className="cards">
      <ul className="cards__list">
        {MoviesDB.map(film => (
          <MoviesCard key={film.id} film={film} />
        ))}
      </ul>
      <button className="cards__button" type="button" name="more">Ещё</button>
    </section>
  );
};

export default MoviesCardList;
