// import { randomPhotos } from './script.js';
import { renderGallery } from './gallery.js';
import { getData, sendData } from './api.js';
import { setOnFormSubmit, closePictureUpload } from './form.js';
import { showError, showSuccess } from './message.js';
import { showAlert } from './util.js';

// renderGallery(randomPhotos());
setOnFormSubmit(async (data) => {
  try {
    await sendData(data);
    closePictureUpload();
    showSuccess();
  } catch {
    showError();
  }
});

try {
  const data = await getData();
  renderGallery(data);
} catch (err) {
  showAlert(err.message);
}
