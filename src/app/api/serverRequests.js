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

export function sendEmail(info){
  const formData = new FormData();
  formData.append('text', info.text);
  formData.append('price', info.price);
  formData.append('items', info.items);

  info.images.map((val) => {
    formData.append(val.name, val);
  });
  return fetch(url + "/api/sendEmail",{
    method: 'POST',
    body: formData
  })
    .then(response => response.json())
}
