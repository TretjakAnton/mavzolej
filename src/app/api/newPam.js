import { url } from '../Constants';

export function addPam(id_pam, type, price, images){
  const formData = new FormData();
  formData.append('id_pam', id_pam);
  formData.append('folder', type[0].folder);
  formData.append('id_type', type[0].id_type);
  formData.append('price', price);
  images.map((val) => {
    formData.append(val.name, val);
  });
  return fetch(url + "/api/monuments",{
    method: 'PUT',
    body: formData
  })
  .then(response => response.json())
}

export function getPam(id_prod, id_type, from, countRow) {
  return fetch(url + `/api/monuments?id_fake=${id_prod}&id_type=${id_type}&from=${from}&countRow=${countRow}`, {
    method: 'GET'
  })
    .then(response => response.json())
}

export function deletePam(id_img, id_prod, imgUrl){
  return fetch(url + "/api/monuments",{
    method: 'DELETE',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      id_img: id_img,
      id_prod: id_prod,
      imgUrl: imgUrl
    })
  })
    .then(response => response.json())
}

export function updatePam(id_monument, id_type, price){
  return fetch(url + "/api/monuments",{
    method: 'PUT',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      id_pam: id_monument,
      id_type: id_type,
      price: price
    })
  })
    .then(response => response.json())
}
