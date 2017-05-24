import { url } from '../Constants';

export function getAllTypes(){
  return fetch(url + "/api/Types",{method: 'GET'})
    .then(response => response.json())
}

export function addType(name, directory, id_item){
  return fetch(url + "/api/Types",{
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name_type: name,
      directory: directory,
      id_item: id_item
    })
  })
    .then(response => response.json())
}

export function updateType(id_type, name, directory, id_item){
  return fetch(url + "/api/Types",{
    method: 'PUT',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      id_type: id_type,
      name_type: name,
      directory: directory,
      id_item: id_item
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
