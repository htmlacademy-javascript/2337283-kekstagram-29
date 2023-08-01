const PICTURES_COUNT = 10;
const Filter = {
  DEFAULT: 'filter-default',
  RANDOM: 'filter-random',
  DISCUSSED: 'filter-discussed',
};

const filterContainer = document.querySelector('.img-filters');
let currentFilter = Filter.DEFAULT;
let sortedPhotos = [];

const sortRandomly = () => Math.random() - 0.5;
const sortMostDiscussed = (a, b) => b.comments.length - a.comments.length;

const getSortedPictures = () => {
  switch (currentFilter) {
    case Filter.RANDOM:
      return [...sortedPhotos].sort(sortRandomly).slice(0, PICTURES_COUNT);
    case Filter.DISCUSSED:
      return [...sortedPhotos].sort(sortMostDiscussed);
    default:
      return [...sortedPhotos];
  }
};

const setOnFilterClick = (callback) => {
  filterContainer.addEventListener('click', (evt) => {
    if (!evt.target.classList.contains('img-filter__button')) {
      return;
    }

    const clickedButton = evt.target;
    if (clickedButton.id === currentFilter) {
      return;
    }
    filterContainer.querySelector('img-filters__button--active').classList.remove('img-filters__button--active');
    clickedButton.classList.add('img-filters__button--active');
    currentFilter = clickedButton.id;
    callback(getSortedPictures);
  });
};

const initFilter = (loadedPictures, callback) => {
  filterContainer.classList.remove('img-filters--inactive');
  sortedPhotos = [...loadedPictures];
  setOnFilterClick(callback);
};

export { initFilter, getSortedPictures };
