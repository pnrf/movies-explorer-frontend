import './Portfolio.css';

function Portfolio() {
  return (
    <section className="portfolio">
      <h3 className="portfolio__title">Портфолио</h3>

      <ul className="portfolio__link-list">
        <li className="portfolio__list-item">
          <a className="portfolio__link" href="https://github.com/pnrf/how-to-learn" target="_blank" rel="noreferrer">
            Статичный сайт
          </a>
        </li>
        <li className="portfolio__list-item">
          <a className="portfolio__link" href="https://github.com/pnrf/russian-travel" target="_blank" rel="noreferrer">
            Адаптивный сайт
          </a>
        </li>
        <li className="portfolio__list-item">
          <a className="portfolio__link" href="https://pnrf.github.io/mesto/" target="_blank" rel="noreferrer">
            Одностраничное приложение
          </a>
        </li>
      </ul>
    </section>
  );
};

export default Portfolio;
