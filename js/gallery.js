import { renderThumbnails } from './thumbnails.js';
import { showBigPicture } from './big-picture.js';

const container = document.querySelector('.pictures');

const renderGallery = (pictures) => {
  container.addEventListener('click', (evt) => {
    const thumbnail = evt.target.closest('[data-thumbnail-id]');
    // const dataAttribute = +thumbnail.dataset.thumbnailId;
    if (!thumbnail) {
      return;
    }
    evt.preventDefault();
    const picture = pictures.find(
      (item) => item.id === +thumbnail.dataset.thumbnailId
    );
    showBigPicture (picture);
  });

  renderThumbnails(pictures, container);
};

export { renderGallery };
