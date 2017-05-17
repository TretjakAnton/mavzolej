import { url } from '../Constants';

export function getSizes(){
  return fetch(url + "/api/size",{method: 'GET'})
    .then(response => response.json())
}