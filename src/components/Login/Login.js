import '../Form/Form.css';
import { Link } from 'react-router-dom';
import logo from '../../images/logo.svg';

function Login() {
  return (
    <section className="form">
      <div className="form__container">
        <Link to="/" className="form__link">
          <img className="form__logo" src={logo} alt="Логотип сайта" />
        </Link>
        <h2 className="form__title">Рады видеть!</h2>

        <form className="form__inputs">
          <div className="form__items">

            <label className="form__item">
              <p className="form__item-label">E-mail</p>
              <input
                className={'form__field form__field_type_error'}
                name="email"
                type="email"
                placeholder="Введите ваш мейл"
                required
              />
              <span className={'form__error form__error_visible'}></span>
            </label>

            <label className="form__item">
              <p className="form__item-label">Пароль</p>
              <input
                className={'form__field form__field_type_error'}
                name="password"
                type="password"
                minLength="2"
                placeholder="Придумайте пароль"
                required
              />
              <span className={'form__error form__error_visible'}>Что-то пошло не так...</span>
            </label>
          </div>
          <button className='form__button' type="submit">Войти</button>
        </form>
        <p className="form__caption">Ещё не зарегистрированы?
          <span className='form__caption-span'><Link to="/signup" className="form__link">Регистрация</Link></span>
        </p>
      </div>
    </section>
  );
};

export default Login;
