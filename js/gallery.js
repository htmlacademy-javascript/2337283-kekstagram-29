import { renderThumbnails } from './thumbnails.js';
import { showBigPicture } from './big-picture.js';

const container = document.querySelector('.pictures');

let pictures = [];

const clickOnContainer = (evt) => {
  const thumbnail = evt.target.closest('[data-thumbnail-id]');
  if (!thumbnail) {
    return;
  }
  evt.preventDefault();
  const picture = pictures.find(
    (item) => item.id === Number(thumbnail.dataset.thumbnailId)
  );
  showBigPicture (picture);
};
const renderGallery = (currentPictures) => {
  pictures = currentPictures;
  renderThumbnails(pictures, container);
  container.addEventListener('click', clickOnContainer);
};

export { renderGallery };
