import 'fetch-polyfill';
const url = "http://localhost:3000";

export function login(password, login){
  return fetch(url + "/api/login",{
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      password: password,
      login: login
    })
  })
  .then(response => response.json())
}
