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

export function getAllTypes(){
  return fetch(url + "/api/Types",{method: 'GET'})
      .then(response => response.json())
}

export function addType(name, directory){
  return fetch(url + "/api/Types",{
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name_type: name,
      directory: directory
    })
  })
  .then(response => response.json())
}

export function updateType(id_type, name, directory){
  return fetch(url + "/api/Types",{
    method: 'PUT',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      id_type: id_type,
      name_type: name,
      directory: directory
    })
  })
      .then(response => response.json())
}

export function deleteType(id_type){
  return fetch(url + "/api/Types",{
    method: 'DELETE',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      id_type: id_type
    })
  })
  .then(response => response.json())
}

export function addPam(id_pam, id_type, opis, price, id_size){
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
      price: price,
      id_size: id_size
    })
  })
  .then(response => response.json())
}

export function updatePam(id_fake, id_pam, id_type, opis, price, id_size){
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
      price: price,
      id_size: id_size,
      id_fake: id_fake
    })
  })
  .then(response => response.json())
}

export function deletePam(id_image, id_fake, type_dir, image){
  return fetch(url + "/api/pam",{
    method: 'DELETE',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      id_image: id_image,
      id_fake: id_fake,
      type_dir: type_dir
    })
  })
  .then(response => response.json())
}

export function getPam(id_fake){
  if(id_fake){
    return fetch(url + "/api/pam?id_fake="+id_fake,{
      method: 'GET'
    })
    .then(response => response.json())
  } else {
    return fetch(url + "/api/pam",{
      method: 'GET'
    })
    .then(response => response.json())
  }
}

export function getByType(id_type){
  return fetch(url + "/api/getByType?id_type="+id_type,{
    method: 'GET',
  })
  .then(response => response.json())
}

export function getSizes(){
  return fetch(url + "/api/size",{method: 'GET'})
      .then(response => response.json())
}

export function getImages(id_image){
  if(id_image){
    return fetch(url + "/api/images?id_image="+id_image,{
      method: 'GET',
    })
    .then(response => response.json())
  } else {
    return fetch(url + "/api/images",{method: 'GET'})
        .then(response => response.json())
  }
}

export function addImages(images){
  const formData = new FormData();
  images.map((val) => {
    formData.append(val.name, val);
  });
  return fetch(url + "/api/images",{
    method: 'PUT',
    body: formData
  })
  .then(response => response.json())
}
