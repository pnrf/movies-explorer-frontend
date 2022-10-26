import './NotFoundPage.css';
import { useNavigate } from 'react-router-dom';

function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <div className="nf-page">
      <div className="nf-page__container">
        <h1 className="nf-page__title">404</h1>
        <p className="nf-page__text">Страница не найдена</p>
      </div>
      <button onClick={() => navigate(-1)} className="nf-page__link">Назад</button>
    </div>
  );
};

export default NotFoundPage;
