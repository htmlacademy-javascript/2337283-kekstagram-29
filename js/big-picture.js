import { isEscapeKey } from './util.js';

const COMMENTS_PER_PORTION = 5;

const bigPicture = document.querySelector('.big-picture');
const cancelButton = bigPicture.querySelector('.big-picture__cancel');
const commentsShownCount = bigPicture.querySelector('.comments-shown-count');
const commentCount = bigPicture.querySelector('.comments-count');
const commentsLoaderButton = bigPicture.querySelector('.comments-loader');
const commentElement = document.querySelector('#comment').content.querySelector('.social__comment');
const commentList = bigPicture.querySelector('.social__comments');
const bigPictureImage = bigPicture.querySelector('.big-picture__img img');
const likesCount = bigPicture.querySelector('.likes-count');
const socialCaption = bigPicture.querySelector('.social__caption');

const body = document.body;

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
  commentList.innerHTML = '';
  commentsShown += COMMENTS_PER_PORTION;
  if (commentsShown >= comments.length) {
    commentsLoaderButton.classList.add('hidden');
    commentsShown = comments.length;
  } else {
    commentsLoaderButton.classList.remove('hidden');
  }
  const fragment = document.createDocumentFragment();
  for (let i = 0; i < commentsShown; i++) {
    const comment = createComment(comments[i]);
    fragment.append(comment);
  }
  commentList.append(fragment);
  commentCount.textContent = comments.length;
  commentsShownCount.textContent = commentsShown;
};

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeBigPicture();
  }
};

const renderPicturesDetailes = ({ url, likes, description }) => {
  bigPictureImage.src = url;
  likesCount.textContent = likes;
  bigPictureImage.alt = description;
  socialCaption.textContent = description;
};

const showBigPicture = (data) => {
  bigPicture.classList.remove('hidden');
  body.classList.add('modal-open');
  commentsLoaderButton.classList.add('hidden');
  document.addEventListener('keydown', onDocumentKeydown);
  renderPicturesDetailes(data);
  comments = data.comments;
  if (comments.length > 0) {
    renderComments();
  }
};

function closeBigPicture () {
  bigPicture.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
  commentsShown = 0;
}

const onCancelElementClick = () => {
  closeBigPicture();
};

const onCommentsLoaderClick = () => {
  renderComments();
};

cancelButton.addEventListener('click', onCancelElementClick);
commentsLoaderButton.addEventListener('click', onCommentsLoaderClick);

export { showBigPicture, renderPicturesDetailes };
