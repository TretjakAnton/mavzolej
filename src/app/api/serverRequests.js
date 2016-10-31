import 'fetch-polyfill';

export function login(password, login){
  return fetch("http://localhost:3000/api/login",{
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      password: password,
      login: login,
    })
  })
  .then(response => response.json())
}

export function getTypes(){
  return fetch("http://localhost:3000/api/allTypes",{method: 'post'})
      .then(response => response.json())
}