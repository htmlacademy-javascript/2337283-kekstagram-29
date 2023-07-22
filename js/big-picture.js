import { isEscapeKey } from './util.js';

const COMMENTS_PER_PORTION = 5;

const bigPictureElement = document.querySelector('.big-picture');
const cancelButtonElement = bigPictureElement.querySelector('.big-picture__cancel');
const commentsShownCountElement = bigPictureElement.querySelector('.comments-shown-count');
const commentCountElement = bigPictureElement.querySelector('.comments-count');
const commentsLoaderElement = bigPictureElement.querySelector('.social__comments-loader');
const commentElement = document.querySelector('#comment').content.querySelector('.social__comment');
const commentListElement = bigPictureElement.querySelector('.social__comments');
const bodyElement = document.body;

let commentsShown = 0;
let comments = [];


const createComment = ({ avatar, name, message }) => {
  const comment = commentElement.cloneNode(true);
  comment.querySelector('.social__picture').src = avatar;
  comment.querySelector('.social__picture').alt = name;
  comment.querySelector('.social__text').textContent = message;

  return comment;
};

const renderComments = () => {
  commentListElement.innerHTML = '';
  commentsShown += COMMENTS_PER_PORTION;
  if (commentsShown >= comments.length) {
    commentsLoaderElement.classList.add('hidden');
    commentsShown = comments.length;
  } else {
    commentsLoaderElement.classList.remove('hidden');
  }
  const fragment = document.createDocumentFragment();
  for (let i = 0; i < commentsShown; i++) {
    const comment = createComment(comments[i]);
    fragment.append(comment);
  }
  commentListElement.append(fragment);
  commentsShownCountElement.textContent = comments.length;
  commentCountElement.textContent = commentsShown;
};

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeBigPicture();
  }
};

const renderPicturesDetailes = ({ url, likes, description }) => {
  bigPictureElement.querySelector('.big-picture__img img').src = url;
  bigPictureElement.querySelector('.likes-count').textContent = likes;
  bigPictureElement.querySelector('.big-picture__img img').alt = description;
  bigPictureElement.querySelector('.social__caption').textContent = description;
};

const showBigPicture = (data) => {
  bigPictureElement.classList.remove('hidden');
  bodyElement.classList.add('modal-open');
  commentsLoaderElement.classList.add('hidden');
  // commentCountElement.classList.add('hidden');
  document.addEventListener('keydown', onDocumentKeydown);
  renderPicturesDetailes(data);
  comments = data.comments;
  if (comments.length > 0) {
    renderComments();
  }
};

function closeBigPicture () {
  bigPictureElement.classList.add('hidden');
  bodyElement.classList.remove('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
  commentsShown = 0;
}

const onCancelElementClick = () => {
  closeBigPicture();
};

const onCommentsLoaderClick = () => renderComments;

cancelButtonElement.addEventListener('click', onCancelElementClick);
commentsLoaderElement.addEventListener('click', onCommentsLoaderClick);

export { showBigPicture, renderPicturesDetailes };
