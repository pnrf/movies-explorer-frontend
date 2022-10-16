import './Profile.css';

function Profile() {

  return (
    <section className="profile">
      <h2 className="profile__form-title">Привет, Юрий!</h2>
      <form className="profile__form">
        <ul className="profile__form-container">
          <li className="profile__form-item">
            <p className="profile__field-label">Имя</p>
            <input className="profile__field" placeholder="name"/>
          </li>

          <li className="profile__form-item">
            <p className="profile__field-label">E-mail</p>
            <input className="profile__field" placeholder="email"/>
          </li>
        </ul>
        <div className="profile__form-buttons">
          <button className="profile__button" type="button">
            Редактировать
          </button>
          <button className="profile__button profile__button_type_highlighted" type="button">
            Выйти из аккаунта
          </button>
        </div>
      </form>
    </section>
  );
};

export default Profile;
