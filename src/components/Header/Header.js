import './Header.css';
import { Link, useLocation } from 'react-router-dom';
import logo from '../../images/logo.svg';
import Navigation from '../Navigation/Navigation';

function Header({ isLoggedIn }) {
  const { pathname } = useLocation();
  return (
    <header className={`header ${pathname === "/" && 'header_theme_dark'}`}>
      <Link to="/">
        <img className="header__logo" src={logo} alt="Логотип сайта" />
      </Link>
      <Navigation isLoggedIn={isLoggedIn}/>
    </header>
  );
};

export default Header;
