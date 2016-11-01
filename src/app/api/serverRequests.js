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

export function getTypes(){
  return fetch(url + "/api/allTypes",{method: 'post'})
      .then(response => response.json())
}

export function addType(name){
  return fetch(url + "/api/allTypes",{
    method: 'PUT',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name_type: name
    })
  })
  .then(response => response.json())
}

export function addPam(id_pam, id_type, opis, id_price, id_size){
  return fetch(url + "/api/pam",{
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      id_pam: id_pam,
      id_type: id_type,
      opis: opis,
      id_price: id_price,
      id_size: id_size
    })
  })
  .then(response => response.json())
}

export function updatePam(id_pam, id_type, opis, id_price, id_size, id_fake){
  return fetch(url + "/api/pam",{
    method: 'PUT',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      id_pam: id_pam,
      id_type: id_type,
      opis: opis,
      id_price: id_price,
      id_size: id_size,
      id_fake: id_fake
    })
  })
  .then(response => response.json())
}

export function deletePam(id_zapis, id_image, id_fake){
  return fetch(url + "/api/pam",{
    method: 'DELETE',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      id_zapis: id_zapis,
      id_image: id_image,
      id_fake: id_fake
    })
  })
  .then(response => response.json())
}

export function getPam(id_fake){
  return fetch(url + "/api/pam",{
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      id_fake: id_fake
    })
  })
  .then(response => response.json())
}