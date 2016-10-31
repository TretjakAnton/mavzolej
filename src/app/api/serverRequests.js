import 'fetch-polyfill';

export function login(password, login){
  return fetch("http://localhost:3000/api/login",{method: 'post', body: {password: password, login: login}})
    .then(response => response.json())
}
