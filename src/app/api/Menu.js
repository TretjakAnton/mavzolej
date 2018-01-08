import { url } from '../Constants';

export function getMenuItems(){
  return fetch(url + "/api/newMenu",{ method: 'OPTIONS' })
    .then(response => response.json())
}

export function addMenuItem(menu_name){
  return fetch(url + "/api/newMenu",{
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

export function updateMenuItem(menu_name, oldMenu_name){
  return fetch(url + "/api/newMenu",{
    method: 'PUT',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      oldMenu_name: oldMenu_name,
      newMenu_name: menu_name,
    })
  })
    .then(response => response.json())
}

export function deleteMenuItem(id){
  return fetch(url + "/api/newMenu",{
    method: 'DELETE',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      id: id,
    })
  })
    .then(response => response.json())
}
