class MainApi {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  _checkRes(res) {
    if (res.ok) {
      return res.json();
    } else {
    return Promise.reject(`Ошибка: ${res.status}`);
    }
  }

  registerUser({ name, email, password }) {
    return fetch(`${this._baseUrl}/signup`, {
      method: 'POST',
      headers: {
        "Accept": "application/json",
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, password }),
    }).then(this._checkRes);
  }

  loginUser({ email, password }) {
    return fetch(`${this._baseUrl}/signin`, {
      method: 'POST',
      headers: {
        "Accept": "application/json",
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    }).then(this._checkRes);
  }

  checkToken(token) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'GET',
      headers: {
        "Accept": "application/json",
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }).then(this._checkRes);
  }

  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'GET',
      headers: this._headers,
    }).then(this._checkRes);
  }

  updateUserInfo({ name, email }) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({ name, email }),
    }).then(this._checkRes);
  }

  getMovies() {
    return fetch(`${this._baseUrl}/movies`, {
      method: 'GET',
      headers: this._headers,
    }).then(this._checkRes);
  }

  addMovies(movie) {
    return fetch(`${this._baseUrl}/movies`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        country: movie.country ? movie.country : "Страна не указана",
        director: movie.director ? movie.director : "Режиссер не указан",
        duration: movie.duration,
        year: movie.year ? movie.year : "Год не указан",
        description: movie.description ? movie.description : "Описание не указано",
        image: `https://api.nomoreparties.co${movie.image.url}`,
        trailerLink: movie.trailerLink ? movie.trailerLink : "Трейлер отсутствует",
        nameRU: movie.nameRU ? movie.nameRU : "Название на русском языке не указано",
        nameEN: movie.nameEN ? movie.nameEN : "Назввание на английском языке не указано",
        thumbnail: `https://api.nomoreparties.co${movie.image.formats.thumbnail.url}`,
        movieId: movie.id,
        owner: movie.owner
      }),
    }).then(this._checkRes);
  }

  deleteMovies(movieId) {
    console.log('movieId', movieId);
    return fetch(`${this._baseUrl}/movies/${movieId}`, {
      method: 'DELETE',
      headers: this._headers,
    }).then(this._checkRes);
  }

  updateToken() {
    this._headers.Authorization = `Bearer ${localStorage.getItem('jwt')}`;
  }
}

const mainApi = new MainApi({
  // baseUrl: 'http://localhost:3001',
  baseUrl: 'https://api.pankratov.nomorepartiesxyz.ru',
  headers: {
    'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  },
});

export default mainApi;
