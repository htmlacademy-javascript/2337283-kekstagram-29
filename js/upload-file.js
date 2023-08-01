const inputLoadPicture = document.querySelector('.img-upload__start input[type=file]');
const addressImage = document.querySelector('.img-upload__preview').querySelector('img');
const backgroundImageFilters = document.querySelectorAll('.effects__preview');
const FILE_TYPES = ['.jpg', '.jpeg', '.png'];

const uploadedImage = () => {
  const file = inputLoadPicture.files[0];
  const fileName = file.name.toLowerCase();
  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

  if (matches) {
    addressImage.src = URL.createObjectURL(file);

    backgroundImageFilters.forEach((value) => {
      value.style.backgroundImage = `url(${URL.createObjectURL(file)})`;
    });
  }
};

inputLoadPicture.addEventListener('change', uploadedImage);
