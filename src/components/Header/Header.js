import './Header.css';
import { Link } from 'react-router-dom';
import logo from '../../images/logo.svg';
import Navigation from '../Navigation/Navigation';

function Header({ isLoggedIn }) {
  return (
    <header className="header">
      <Link to="/">
        <img className="header__logo" src={logo} alt="Логотип сайта" />
      </Link>
      <Navigation isLoggedIn={isLoggedIn}/>
    </header>
  );
};

export default Header;
