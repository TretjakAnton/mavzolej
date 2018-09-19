import { url } from '../Constants';

export function addUpdatePam(id_pam, type, description, price, images, _id, oldImges) {
  const formData = new FormData();
  if (_id) {
    formData.append('_id', _id);
    formData.append('oldImg', oldImges);
  }
  formData.append('id_pam', id_pam);
  formData.append('folder', type.folder);
  formData.append('type_name', type.type_name);
  formData.append('menu_name', type.menu_name);
  formData.append('description', description);
  formData.append('price', price);
  if (images) {
    images.map((val) => {
      formData.append(val.name, val);
    });
  }
  return fetch(url + "/api/newMonum", {
    method: 'POST',
    body: formData
  })
    .then(response => response.json())
}

export function getPam(id_pam, type_name, from, countRow, folder) {
  return fetch(url + `/api/newMonum`, {
    method: 'OPTIONS',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      id_pam: id_pam,
      type_name: type_name,
      from: from,
      countRow: countRow,
      folder: folder,
    })
  })
    .then(response => response.json())
}

export function getCountPams(type_name) {
  return fetch(`${url}/api/countPams`, {
    method: 'OPTIONS',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      type_name: type_name,
    })
  })
    .then(response => response.json())
}

export function deletePam(_id) {
  return fetch(url + "/api/newMonum", {
    method: 'DELETE',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      _id: _id
    })
  })
    .then(response => response.json())
}

export function deleteImage(_id, image, folder) {
  return fetch(url + "/api/pamImage", {
    method: 'DELETE',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      _id: _id,
      image: image,
      folder: folder,
    })
  })
    .then(response => response.json())
}

export function updatePam(model) {
  return fetch(url + "/api/newMonum", {
    method: 'PUT',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      model: model,
    })
  })
    .then(response => response.json())
}
