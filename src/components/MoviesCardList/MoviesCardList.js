import './MoviesCardList.css';
import { useEffect, useState } from 'react';
import MoviesCard from '../MoviesCard/MoviesCard';

function MoviesCardList() {

  const getMoviesArr = () => {
    const allFoundMovies = JSON.parse(localStorage.getItem('allFoundMovies'));
    const shortFoundMovies = JSON.parse(localStorage.getItem('shortFoundMovies'));
    const toggleValue = JSON.parse(localStorage.getItem('isToggle'));

    let moviesArr;

    if (toggleValue) {
      moviesArr = shortFoundMovies;
    } else {
      moviesArr = allFoundMovies;
    };

    console.log('getMoviesArr', moviesArr);
    return moviesArr;
  };

  const newMoviesArr = [];

  const rebuildMoviesArr = () => {
    const screenWidth = document.documentElement.clientWidth;
    const moviesArr = getMoviesArr();

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

  // renderMovies();
  // console.log('111', arr, newArr);

  // renderMovies();
  // console.log('222', arr, newArr);

  // const a = () => {
  //   newArr.forEach(elm => {
  //     let [ film ] = elm;
  //     // console.log('film', typeof film);
  //     elm.map(film => console.log("aaaaaaaaaaa", film.id));
  //     // return film;
  //   })
  // };


  // const b = a();
  // console.log('b', b);



  // let moviesArrToRender = [];
  // console.log('bbb', moviesArrToRender);

  // const renderMovies = () => {
  //   let chunk = newMoviesArr.splice(0, 1);
  //   moviesArrToRender.concat(chunk);
  //   // console.log('ddd', moviesArrToRender);
  // };

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
