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
          <p className="about-me__profession">Юрист, веб-разработчик, 41 год</p>
          <p className="about-me__description">
            20&nbsp;лет отработал юристом в&nbsp;торгово-производственных и&nbsp;консалтинговых компаниях.
            Оформлял сделки, оптимизировал бизнес-процессы, защищал интересы бизнеса и&nbsp;права граждан в&nbsp;судах и&nbsp;госорганах.
          </p>
          <p className="about-me__description">
          В&nbsp;последующие годы планирую развиваться в&nbsp;сфере информационной безопасности.
          Хочу совместить свои юридические навыки с&nbsp;умением создавать надежные онлайн-сервисы и&nbsp;веб-приложения.
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
