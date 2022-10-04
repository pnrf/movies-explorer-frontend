import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <p className="footer__text">Учебный проект Яндекс.Практикум х BeatFilm.</p>
      <nav className="footer__nav">
        <p className="footer__copyright">&copy; 2022</p>
        <ul className="footer__nav-list">
          <li className="footer__nav-item"><a className="footer__nav-link" href="https://practicum.yandex.ru/web" target="_blank" rel="noreferrer">Яндекс.Практикум</a></li>
          <li className="footer__nav-item"><a className="footer__nav-link" href="https://github.com/pnrf" target="_blank" rel="noreferrer">Github</a></li>
        </ul>
      </nav>
    </footer>
  );
};

export default Footer;
