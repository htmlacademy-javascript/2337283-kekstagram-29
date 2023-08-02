import { renderGallery } from './gallery.js';
import { getData, sendData } from './api.js';
import { setOnFormSubmit, closePictureUpload } from './form.js';
import { showErrorMessage, showSuccessMessage } from './message.js';
import { showAlert, debounce } from './util.js';
import { initializeFilter, getSortedPictures } from './filters.js';
import { onInputLoadClick } from './upload-file.js';

onInputLoadClick();
setOnFormSubmit(async (data) => {
  try {
    await sendData(data);
    closePictureUpload();
    showSuccessMessage();
  } catch {
    showErrorMessage();
  }
});

try {
  const data = await getData();
  const debouncedRenderGallery = debounce(renderGallery);
  initializeFilter(data, debouncedRenderGallery);
  renderGallery(getSortedPictures());
  renderGallery(data);
} catch (err) {
  showAlert(err.message);
}
