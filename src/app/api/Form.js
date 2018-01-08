import { url } from '../Constants';

export function getForm() {
  return fetch(url + "/api/newFields",{
    method: 'OPTIONS',
  })
    .then(response => response.json())
}

export function setForm( formData ) {
  return fetch(url + "/api/newFields",{
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({data: formData})
  })
    .then(response => response.json())
}
