import { url } from '../Constants';

export function getAllTypes(){
  return fetch(url + "/api/newType",{method: 'OPTIONS'})
    .then(response => response.json())
}

export function addType(name, directory, menu_name){
  return fetch(url + "/api/newType",{
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      type_name: name,
      folder: directory,
      menu_name: menu_name
    })
  })
    .then(response => response.json())
}

export function updateType(type_name, folder, menu_name, oldType_name){
  return fetch(url + "/api/newType",{
    method: 'PUT',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      type_name: type_name,
      folder: folder,
      menu_name: menu_name,
      oldType_name: oldType_name,
    })
  })
    .then(response => response.json())
}

export function deleteType(type_name){
  return fetch(url + "/api/newType",{
    method: 'DELETE',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      type_name: type_name
    })
  })
    .then(response => response.json())
}
