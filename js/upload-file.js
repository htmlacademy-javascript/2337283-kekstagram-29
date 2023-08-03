const EXTENTIONS = ['.jpg', '.jpeg', '.png'];

const inputLoadPicture = document.querySelector('.img-upload__start input[type=file]');
const addressImage = document.querySelector('.img-upload__preview').querySelector('img');
const backgroundImageFilters = document.querySelectorAll('.effects__preview');

const uploadedImage = () => {
  const file = inputLoadPicture.files[0];
  const fileName = file.name.toLowerCase();
  const matches = EXTENTIONS.some((fileExt) => fileName.endsWith(fileExt));

  if (matches) {
    addressImage.src = URL.createObjectURL(file);

    backgroundImageFilters.forEach((value) => {
      value.style.backgroundImage = `url(${URL.createObjectURL(file)})`;
    });
  }
};

const onInputLoadClick = () => {
  inputLoadPicture.addEventListener('change', uploadedImage);
};

export { onInputLoadClick };
