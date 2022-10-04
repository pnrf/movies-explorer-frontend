import './Promo.css';
import bgrImg from '../../images/promo-bgr-img.svg';

function Promo() {
  return (
    <section className="promo">
      <div className="promo__container">
        <h1 className="promo__title">Учебный проект студента факультета Веб-разработки.</h1>
        <span className="promo__subtitle">Листайте ниже, чтобы узнать больше про этот проект и его создателя.</span>
        <a className="promo__link" href="#about-project">Узнать больше</a>
      </div>
      <img className="promo__bgr-img" src={bgrImg} alt="Фоновое изображение"/>
    </section>
  );
};

export default Promo;
