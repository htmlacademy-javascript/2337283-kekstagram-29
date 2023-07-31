import { isEscapeKey } from './util.js';
import { resetScale } from './scale.js';
import { resetFilter, resetSlider } from './effects.js';

const HASHTAG_REG_EXP = /^#[a-za-яё0-9]{1,19}$/i;
const HASHTAGS_MAX_COUNT = 5;
const body = document.body;
const uploadForm = document.querySelector('.img-upload__form');
const pictureEdit = document.querySelector('.img-upload__overlay');
const uplodeFileInput = uploadForm.querySelector('.img-upload__input');
const cancelButton = uploadForm.querySelector('.img-upload__cancel');
const hashtagInput = uploadForm.querySelector('.text__hashtags');
const descriptionField = uploadForm.querySelector('.text__description');
const submitButton = uploadForm.querySelector('.img-upload__submit');
let errorMessage;

const SubmitButtonText = {
  IDLE: 'Опубликовать',
  SENDING: 'Загружаем...'
};

const isTextFieldFocused = () => document.activeElement === hashtagInput || document.activeElement === descriptionField;

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt) && !isTextFieldFocused()) {
    evt.preventDefault();
    closePictureUpload();
  }
};

const pristine = new Pristine (uploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'form__error'
}, false);

const validateHashtags = (value) => {
  const createHashtagString = value.toLowerCase().trim().split(' ').filter((item) => item);
  const allHashtags = new Set(createHashtagString);

  if (createHashtagString.length > HASHTAGS_MAX_COUNT) {
    errorMessage = 'Максимум пять хештегов';
    return false;
  }
  if (createHashtagString.length !== allHashtags.size) {
    errorMessage = 'Хэш-теги не должны повторяться';
    return false;
  }

  errorMessage = 'Хэш-тег должен начинаться с # и может содержать только буквы и цифры';
  return createHashtagString.every((hashtag) => HASHTAG_REG_EXP.test(hashtag));
};

function getErrorMessage() {
  return errorMessage;
}

const blockSubmitButton = () => {
  submitButton.disabled = true;
  submitButton.textContent = SubmitButtonText.SENDING;
};

const unblockSubmitButton = () => {
  submitButton.disabled = false;
  submitButton.textContent = SubmitButtonText.IDLE;
};

const setOnFormSubmit = (cb) => {
  uploadForm.addEventListener('submit', async (evt) => {
    evt.preventDefault();
    const isValid = pristine.validate();

    if (isValid) {
      blockSubmitButton();
      await cb(new FormData(uploadForm));
      unblockSubmitButton();
    }
  });
};

pristine.addValidator(hashtagInput, validateHashtags, getErrorMessage);

uploadForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  pristine.validate();
});

const onCancelButtonClick = () => {
  closePictureUpload();
};

function openPictureUpload() {
  body.classList.add('modal-open');
  pictureEdit.classList.remove('hidden');
  document.addEventListener('keydown', onDocumentKeydown);
  cancelButton.addEventListener('click', onCancelButtonClick);
}

function closePictureUpload() {
  uploadForm.reset();
  pristine.reset();
  resetScale();
  resetFilter();
  resetSlider();
  body.classList.remove('modal-open');
  pictureEdit.classList.add('hidden');
  document.removeEventListener('keydown', onDocumentKeydown);
  cancelButton.removeEventListener('click', onCancelButtonClick);
}

uplodeFileInput.addEventListener('change', openPictureUpload, setOnFormSubmit);

export { closePictureUpload, setOnFormSubmit };
