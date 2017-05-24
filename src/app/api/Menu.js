import { url } from '../Constants';

export function getMenuItems(){
  return fetch(url + "/api/menu",{ method: 'GET' })
    .then(response => response.json())
}

export function addMenuItem(menu_name){
  return fetch(url + "/api/menu",{
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      menu_name: menu_name,
    })
  })
  .then(response => response.json())
}

export function updateMenuItem(id, menu_name){
  return fetch(url + "/api/menu",{
    method: 'PUT',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      id_item: id,
      menu_name: menu_name,
    })
  })
    .then(response => response.json())
}

export function deleteMenuItem(id){
  return fetch(url + "/api/menu",{
    method: 'DELETE',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      id_item: id,
    })
  })
    .then(response => response.json())
}
