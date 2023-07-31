import {isEscapeKey} from './util.js';

const successTemplate = document.querySelector('#success')
  .content
  .querySelector('.success');
const errorTemplate = document.querySelector('#error')
  .content
  .querySelector('.error');

function showSuccess() {
  const messageSuccess = successTemplate.cloneNode(true);
  document.body.append(messageSuccess);
  const successButton = messageSuccess.querySelector('.success__button');
  document.addEventListener('keydown', onDocumentKeydown);

  successButton.addEventListener('click', () => {
    messageSuccess.remove();
    document.removeEventListener('keydown', onDocumentKeydown);
  });

  document.addEventListener('click', (evt) => {
    if (evt.target.className !== 'success__inner' && evt.target.className !== 'success__title') {
      messageSuccess.remove();
    }
  });
}

function showError() {
  const messageError = errorTemplate.cloneNode(true);
  document.body.append(messageError);
  document.addEventListener('keydown', onDocumentKeydown);

  const errorButton = messageError.querySelector('.error__button');

  errorButton.addEventListener('click', () => {
    messageError.remove();
    document.removeEventListener('keydown', onDocumentKeydown);
  });

  document.addEventListener('click', (evt) => {
    if (evt.target.className !== 'error__inner' && evt.target.className !== 'error__title') {
      messageError.remove();
    }
  });
}

function onDocumentKeydown(evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    const messageSuccess = document.querySelector('.success');
    const messageError = document.querySelector('.error');
    if (messageSuccess) {
      messageSuccess.remove();
    }
    if (messageError) {
      messageError.remove();
    }
    document.removeEventListener('keydown', onDocumentKeydown);
  }
}

// function onDocumentKeydown(evt) {
//   if (isEscapeKey(evt)) {
//     evt.preventDefault();
//     messageSuccess.remove();
//     messageError.remove();
//     document.removeEventListener('keydown', onDocumentKeydown);
//   }
// }

export {showSuccess, showError};
