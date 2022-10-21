import './MoviesCardList.css';
import { useEffect, useState } from 'react';
import MoviesCard from '../MoviesCard/MoviesCard';

function MoviesCardList() {

  const getMoviesArr = () => {
    const allFoundMovies = JSON.parse(localStorage.getItem('allFoundMovies'));
    const shortFoundMovies = JSON.parse(localStorage.getItem('shortFoundMovies'));
    const isToggle = JSON.parse(localStorage.getItem('isToggle'));

    let moviesArr;

    if (allFoundMovies === null || shortFoundMovies === null) {
      moviesArr = [];
    } else if (isToggle) {
      moviesArr = shortFoundMovies;
    } else {
      moviesArr = allFoundMovies;
    };
    console.log('allFoundMovies, shortFoundMovies:', allFoundMovies, shortFoundMovies);

    return moviesArr;
  };

  const newMoviesArr = [];

  const rebuildMoviesArr = () => {
    const screenWidth = document.documentElement.clientWidth;
    const moviesArr = getMoviesArr();

    console.log('moviesArr:', moviesArr);

    let counter;

    if (screenWidth < 768) {
      counter = [5, 2];
    } else if (screenWidth >= 768 && screenWidth < 1280) {
      counter = [8, 2];
    } else {
      counter = [12, 4];
    };

    const spliceIntoChunks = () => {
      let chunk = moviesArr.splice(0, counter[0]);
      newMoviesArr.push(chunk);

      if (moviesArr.length > 0) {
        while (moviesArr.length > 0) {
          chunk = moviesArr.splice(0, counter[1]);
          newMoviesArr.push(chunk);
        }
      }
    }

    spliceIntoChunks();
  };

  rebuildMoviesArr();

  let [ arr ] = newMoviesArr;
  console.log('newMoviesArr', newMoviesArr);
  console.log('arr', arr);

  const newArr = [];

  const renderMovies = () => {
      let chunk = newMoviesArr.splice(0, 1);
      newArr.unshift(chunk);
      console.log('newArr', newArr);
  };

  // useEffect(() => {
  //   renderMovies();
  // }, []);
  renderMovies();
  let [ newArrFirst ] = newArr;
  let [ newArrSecond ] = newArrFirst;

  console.log('newArr', newArr);
  console.log('newArrFirst', newArrFirst);
  console.log('newArrSecond', newArrSecond);

  return (
    <section className="cards">
      <ul className="cards__list">
        {arr.length > 0
          ? (newArrSecond.map(film => (
              <MoviesCard key={film.id} film={film} />
            )))
          : (<span className="cards__message">К сожалению, по вашему запросу ничего не найдено</span>)
        }
      </ul>
      {newArr.length < newMoviesArr.length
        && (<button className="cards__button" type="button" name="more" onClick={renderMovies}>Ещё</button>)
      }
    </section>
  );
};

export default MoviesCardList;
