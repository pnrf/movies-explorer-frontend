class Token {
  constructor() {
    this.jwt = 'jwt';
  }

  checkToken() {
    return localStorage.getItem(this.jwt);
  }

  setToken(token) {
    return localStorage.setItem(this.jwt, token);
  }

  removeToken() {
    return localStorage.removeItem(this.jwt);
  }
}

const token = new Token();

export default token;
