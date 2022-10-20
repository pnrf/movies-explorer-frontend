import '../Form/Form.css';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../images/logo.svg';
import isEmail from 'validator/es/lib/isEmail';

function Register({ onRegister }) {
  const [inputValues, setInputValues] = useState({});
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);

  const handleInputChange = (evt) => {
    const target = evt.target;
    const name = target.name;
    const value = target.value;

    if (name === 'email') {
      if (!isEmail(value)) {
        target.setCustomValidity('Введен некорректный адрес почты');
      } else {
        target.setCustomValidity('');
      }
    }

    setInputValues({ ...inputValues, [name]: value });
    setErrors({ ...errors, [name]: target.validationMessage });
    setIsValid(target.closest('form').checkValidity());
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    onRegister(inputValues);
  };

  return (
    <section className="form">
      <div className="form__container">
        <Link to="/" className="form__link">
          <img className="form__logo" src={logo} alt="Логотип сайта" />
        </Link>
        <h2 className="form__title">Добро пожаловать!</h2>

        <form className="form__inputs" onSubmit={handleSubmit}>
          <div className="form__items">
            <label className="form__item">
              <p className="form__item-label">Имя</p>
              <input
                className="form__field"
                name="name"
                type="text"
                placeholder="Введите ваше имя"
                minLength="2"
                maxLength="40"
                value={inputValues.name || ''}
                onChange={handleInputChange}
                required
              />
              <span className={'form__error form__error_visible'}>Что-то пошло не так...</span>
            </label>

            <label className="form__item">
              <p className="form__item-label">E-mail</p>
              <input
                className={`form__field ${errors.email && 'form__field_type_error'}`}
                name="email"
                type="email"
                placeholder="Введите ваш мейл"
                value={inputValues.email || ''}
                onChange={handleInputChange}
                required
              />
              <span className={`form__error ${errors.email && 'form__error_visible'}`}>{errors.email}</span>
            </label>

            <label className="form__item">
              <p className="form__item-label">Пароль</p>
              <input
                className={`form__field ${errors.password && 'form__field_type_error'}`}
                name="password"
                type="password"
                minLength="2"
                placeholder="Придумайте пароль"
                value={inputValues.password || ''}
                onChange={handleInputChange}
                required
              />
              <span className={`form__error ${errors.password && 'form__error_visible'}`}>{errors.password}</span>
            </label>
          </div>
          <button className={`form__button ${!isValid && "form__button_disabled"}`} disabled={!isValid && true} type="submit">Зарегистрироваться</button>
        </form>
        <p className="form__caption">Уже зарегистрированы?
          <span className='form__caption-span'><Link to="/signin" className="form__link">Войти</Link></span>
        </p>
      </div>
    </section>
  );
};

export default Register;
