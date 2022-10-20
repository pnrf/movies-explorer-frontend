import './NavBar.css';
import { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';

function NavBar() {
  const { pathname } = useLocation();
  const [isMenuOpened, setIsMenuOpened] = useState(false);
  const handleMenuOpening = () => setIsMenuOpened(true);
  const handleMenuClosing = () => setIsMenuOpened(false);

  return (
    <>
      <div className="navbar">
        <div className="navbar__hamburger-overlay" onClick={handleMenuOpening}>
          <div className={`navbar__hamburger ${pathname === "/" && 'navbar__hamburger_type_light'}`} />
        </div>

        <section className="navbar__menu">
          <ul className="navbar__menu-list">
            <li className="navbar__menu-list-item">
              <NavLink
                className={`navbar__menu-link ${pathname === "/" && 'navbar__menu-link_type_light'}`}
                activeclassname="navbar__menu-link_active"
                onClick={handleMenuClosing}
                to="/movies">Фильмы
              </NavLink>
            </li>
            <li className="navbar__menu-list-item">
              <NavLink
                className={`navbar__menu-link ${pathname === "/" && 'navbar__menu-link_type_light'}`}
                activeclassname="navbar__menu-link_active"
                onClick={handleMenuClosing}
                to="/saved-movies">Сохранённые фильмы
              </NavLink>
            </li>
          </ul>
          <div className="navbar__menu-account">
            <NavLink
              className={`navbar__menu-account-link ${pathname === "/" && 'navbar__menu-account-link_type_light'}`}
              activeclassname="navbar__menu-account-link_active"
              onClick={handleMenuClosing}
              to="/profile">Аккаунт
            </NavLink>
          </div>
        </section>
      </div>

      {isMenuOpened && (
        <section className="drop-down-menu">
          <div className="drop-down-menu__container">
            <button className="drop-down-menu-close-btn" type="button" onClick={handleMenuClosing}></button>
            <ul className="navbar__menu-list">
              <li className="navbar__menu-list-item">
                <NavLink
                  className="navbar__menu-link"
                  activeclassname="navbar__menu-link_active"
                  onClick={handleMenuClosing}
                  to="/">Главная
                </NavLink>
              </li>
              <li className="navbar__menu-list-item">
                <NavLink
                  className="navbar__menu-link"
                  activeclassname="navbar__menu-link_active"
                  onClick={handleMenuClosing}
                  to="/movies">Фильмы
                </NavLink>
              </li>
              <li className="navbar__menu-list-item">
                <NavLink
                  className="navbar__menu-link"
                  activeclassname="navbar__menu-link_active"
                  onClick={handleMenuClosing}
                  to="/saved-movies">Сохранённые фильмы
                </NavLink>
              </li>
            </ul>
            <div className="navbar__menu-account">
              <NavLink
                className="navbar__menu-account-link"
                activeclassname="navbar__menu-account-link_active"
                onClick={handleMenuClosing}
                to="/profile">Аккаунт
              </NavLink>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default NavBar;
