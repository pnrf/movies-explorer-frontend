import './SavedMovies.css';
import SearchForm from '../SearchForm/SearchForm';
import Preloader from '../Preloader/Preloader';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

function SavedMovies() {

  return (
    <section className="saved-movies">
      <SearchForm />
      {/* <Preloader /> */}
      <MoviesCardList />
    </section>
  );
};

export default SavedMovies;
