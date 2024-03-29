import './Profile.css';
import { useState, useContext } from 'react';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import MainApi from '../../utils/MainApi';

function Profile({ onLogout }) {
  const currentUser = useContext(CurrentUserContext);
  const [name, setName] = useState(currentUser.name);
  const [newName, setNewName] = useState(currentUser.name);
  const [email, setEmail] = useState(currentUser.email);
  const [newEmail, setNewEmail] = useState(currentUser.email);
  const [isVisible, setIsVisible] = useState(false);

  const handleSubmit = (evt) => {
    evt.preventDefault();

    MainApi
      .updateUserInfo({ name, email })
      .then(() => {
        setIsVisible(false);
        setNewName(name);
        setNewEmail(email);
        alert('Данные пользователя изменены успешно!');
      })
      .catch((err) => {
        alert(`Не удалось изменить данные пользователя. Ошибка: ${err}`);
      });
    };

  function updateName(evt) {
    const value = evt.target.value;
    setName(value);

    if (value !== newName) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  }

  function updateEmail(evt) {
    const value = evt.target.value;
    setEmail(value);

    if (value !== newEmail) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  }

  return (
    <section className="profile">
      <h2 className="profile__form-title">Привет, {name}!</h2>
      <form className="profile__form" onSubmit={handleSubmit}>
        <ul className="profile__form-container">
          <li className="profile__form-item">
            <p className="profile__field-label">Имя</p>
            <input className="profile__field" placeholder="name" value={name} onChange={updateName}/>
          </li>

          <li className="profile__form-item">
            <p className="profile__field-label">E-mail</p>
            <input className="profile__field" placeholder="email" value={email} onChange={updateEmail}/>
          </li>
        </ul>
        <div className="profile__form-buttons">
          <button className="profile__button" type="submit" disabled={!isVisible}>
            Редактировать
          </button>
          <button className="profile__button profile__button_type_highlighted" type="button" onClick={onLogout}>
            Выйти из аккаунта
          </button>
        </div>
      </form>
    </section>
  );
};

export default Profile;
