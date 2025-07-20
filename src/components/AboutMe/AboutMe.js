import './AboutMe.css';
import avatar from '../../images/avatar.jpg';

function AboutMe() {
  return (
    <section className="about-me">
      <h2 className="about-me__title">О себе</h2>
      <div className="about-me__wrapper">
        <img className="about-me__image" src={avatar} alt="Моя фотография" />
        <div className="about-me__info">
          <h3 className="about-me__name">Юрий</h3>
          <p className="about-me__profession">Студент</p>
          <p className="about-me__description">
            После обучения в Яндекс Практикуме собираюсь работать в ИТ.
          </p>
          <p className="about-me__description">
            Планирую стать техническим писателем. Составлять документацию по программным продуктам и контент для корпоративных баз знаний.
          </p>
          <ul className="about-me__link-list">
            <li><a className="about-me__link" href="https://github.com/pnrf" target="_blank" rel="noreferrer">Мой Github ↗</a></li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default AboutMe;
