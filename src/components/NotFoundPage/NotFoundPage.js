import './NotFoundPage.css';
import { Link } from 'react-router-dom';

function NotFoundPage() {
  return (
    <div className="nf-page">
      <div className="nf-page__container">
        <h1 className="nf-page__title">404</h1>
        <p className="nf-page__text">Страница не найдена</p>
      </div>
      <Link to="/" className="nf-page__link">Назад</Link>
    </div>
  );
};

export default NotFoundPage;
