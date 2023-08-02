import {isEscapeKey} from './util.js';

const successTemplate = document.querySelector('#success').content.querySelector('.success');
const errorTemplate = document.querySelector('#error').content.querySelector('.error');

function showSuccessMessage() {
  const messageSuccessTemplate = successTemplate.cloneNode(true);
  document.body.append(messageSuccessTemplate);
  const successButton = messageSuccessTemplate.querySelector('.success__button');
  document.addEventListener('keydown', closeDocumentKeydown);

  successButton.addEventListener('click', () => {
    messageSuccessTemplate.remove();
    document.removeEventListener('keydown', closeDocumentKeydown);
  });

  document.addEventListener('click', (evt) => {
    if (evt.target.className !== 'success__inner' && evt.target.className !== 'success__title') {
      messageSuccessTemplate.remove();
    }
  });
}

function showErrorMessage() {
  const messageErrorTemplate = errorTemplate.cloneNode(true);
  document.body.append(messageErrorTemplate);
  document.addEventListener('keydown', closeDocumentKeydown);
  const errorButton = messageErrorTemplate.querySelector('.error__button');

  errorButton.addEventListener('click', () => {
    messageErrorTemplate.remove();
    document.removeEventListener('keydown', closeDocumentKeydown);
  });

  document.addEventListener('click', (evt) => {
    if (evt.target.className !== 'error__inner' && evt.target.className !== 'error__title') {
      messageErrorTemplate.remove();
    }
  });
}


function closeDocumentKeydown(evt) {
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
    document.removeEventListener('keydown', closeDocumentKeydown);
  }
}

export {showSuccessMessage, showErrorMessage};
