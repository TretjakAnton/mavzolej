import 'fetch-polyfill';
import { url } from '../Constants';

export function login(password, login) {
  return fetch(url + "/api/login", {
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

export function testMail(info) {
  let formData = [];

  const getBase64 = (file) => {
    var reader = new FileReader();
    reader.readAsDataURL(file);
    return new Promise((resolve, reject) => {
      reader.onload = (event) => {
        resolve(reader.result);
      };
    });
  }

  if (!info.images || info.images.length <= 0) {
    return fetch(url + "/api/sendEmail", {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        text: info.text,
        type: info.type,
        id: info.id,
        email: info.email,
        price: info.price,
        items: info.items,
        images: [],
      })
    })
      .then(response => response.json());
  } else {
    return new Promise((resolve, reject) => {
      Promise.all(info.images.map((el) => getBase64(el))).then(values => {
        fetch(url + "/api/sendEmail", {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            text: info.text,
            type: info.type,
            id: info.id,
            email: info.email,
            price: info.price,
            items: info.items,
            images: values,
          })
        })
          .then(response => resolve(response.json()));
      });
    });
  }
}