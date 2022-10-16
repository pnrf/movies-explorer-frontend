import './Navigation.css';
import { Link } from 'react-router-dom';
import NavBar from '../NavBar/NavBar';

function Navigation({ isLoggedIn }) {
  return (
    <nav className='navigation'>
      {isLoggedIn ? <NavBar /> : (
        <ul className="navigation__list">
          <li className="navigation__list-item">
            <Link to="/signup" className="navigation__link navigation__link_type_default">Регистрация</Link>
          </li>
          <li className="navigation__list-item">
            <Link to="/signin" className="navigation__link navigation__link_type_highlighted">Войти</Link>
          </li>
        </ul>
      )}
    </nav>
  );
};

export default Navigation;
