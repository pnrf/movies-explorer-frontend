import './AboutMe.css';
import avatar from '../../images/avatar.jpg';

function AboutMe() {
  return (
    <section className="about-me">
      <h2 className="about-me__title">Студент</h2>
      <div className="about-me__wrapper">
        <img className="about-me__image" src={avatar} alt="Моя фотография" />
        <div className="about-me__info">
          <h3 className="about-me__name">Юрий</h3>
          <p className="about-me__profession">Фронтенд-разработчик, 41 год</p>
          <p className="about-me__description">
            20&nbsp;лет отработал юристом в&nbsp;торгово-производственных и&nbsp;консалтинговых компаниях.
            Чего хотел, добился. В&nbsp;последующие годы планирую посвятить себя IT. Хочу совместить свои
            навыки работы с&nbsp;информацией с&nbsp;умением создавать качественные онлайн-сервисы и&nbsp;веб-приложения.
          </p>
          <ul className="about-me__link-list">
            <li><a className="about-me__link" href="https://github.com/pnrf" target="_blank" rel="noreferrer">Github</a></li>
            <li><a className="about-me__link" href="https://t.me/pnrf_tg" target="_blank" rel="noreferrer">Telegram</a></li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default AboutMe;
