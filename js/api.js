// const getData = (url, onSuccess, onFail) => {
//   fetch(url)
//     .then((response) => {
//       if (response.ok) {
//         return response.json();
//       }
//       throw new Error();
//     })
//     .then((data) => onSuccess(data))
//     .catch(() => onFail());
// };

// const sendData = (url, onSuccess, onFail, body) => {
//   fetch(url, {
//     method: 'POST',
//     body
//   })
//     .then((response) => {
//       if (response.ok) {
//         return response.json();
//       }
//       throw new Error();
//     })
//     .then(() => onSuccess())
//     .catch(() => onFail());
// };

// export { getData, sendData };

const BASE_URL = 'https://28.javascript.pages.academy/kekstagram';
const Route = {
  GET_DATA: '/data',
  SEND_DATA: '/',
};
const Method = {
  GET: 'GET',
  POST: 'POST',
};
const ErrorText = {
  GET_DATA: 'Не удалось загрузить данные. Попробуйте обновить страницу',
  SEND_DATA: 'Не удалось отправить форму. Попробуйте еще раз',
};

const load = (route, errorText, method = Method.GET, body = null) =>
  fetch(`${BASE_URL}${route}`, { method, body })
    .then((response) => {
      if (!response.ok) {
        throw new Error();
      }
      return response.json();
    })
    .catch(() => {
      throw new Error(errorText);
    });

const getData = () => load(Route.GET_DATA, ErrorText.GET_DATA);

const sendData = (body) =>
  load(Route.SEND_DATA, ErrorText.SEND_DATA, Method.POST, body);

export { getData, sendData };
