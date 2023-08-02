const EFFECTS_SETUPS = [
  {
    filter: 'none',
    style: '',
    min: 0,
    max: 100,
    step: 1,
    unit: '',
  },
  {
    filter: 'chrome',
    style: 'grayscale',
    min: 0,
    max: 1,
    step: 0.1,
    unit: '',
  },
  {
    filter: 'sepia',
    style: 'sepia',
    min: 0,
    max: 1,
    step: 0.1,
    unit: '',
  },
  {
    filter: 'marvin',
    style: 'invert',
    min: 0,
    max: 100,
    step: 1,
    unit: '%',
  },
  {
    filter: 'phobos',
    style: 'blur',
    min: 0,
    max: 3,
    step: 0.1,
    unit: 'px',
  },
  {
    filter: 'heat',
    style: 'brightness',
    min: 1,
    max: 3,
    step: 0.1,
    unit: '',
  },
];

const DEFAULT_EFFECT = EFFECTS_SETUPS[0];

const sliderContainer = document.querySelector('.effect-level');
const levelSlider = document.querySelector('.effect-level__slider');
const levelInput = document.querySelector('.effect-level__value');
const effectsList = document.querySelector('.effects');
const imagePreview = document.querySelector('.img-upload__preview');

let currentEffect = DEFAULT_EFFECT;

const showSlider = () => {
  sliderContainer.classList.remove('hidden');
};

const hideSlider = () => {
  sliderContainer.classList.add('hidden');
};

hideSlider();

const updateSlider = () => {
  levelSlider.noUiSlider.updateOptions({
    range: {
      min: currentEffect.min,
      max: currentEffect.max,
    },
    step: currentEffect.step,
    start: currentEffect.max,
  });
};

const resetSlider = () => {
  levelSlider.noUiSlider.reset();
  sliderContainer.classList.add('hidden');
};

const resetFilter = () => {
  imagePreview.style.filter = 'none';
};

const clickOnEffectsList = (evt) => {
  if (evt.target.classList.contains('effects__radio')) {
    currentEffect = EFFECTS_SETUPS.find((effect) => effect.filter === evt.target.value);
    imagePreview.classfilter = `img-upload__preview effects__preview--${currentEffect.filter}`;

    updateSlider();

    if (currentEffect.filter === 'none') {
      hideSlider();
    } else {
      showSlider();
    }
  }
};

const updateOnSlider = () => {
  const sliderValue = levelSlider.noUiSlider.get();
  levelInput.value = sliderValue;
  imagePreview.style.filter = `${currentEffect.style}(${sliderValue}${currentEffect.unit})`;

  if (currentEffect.filter === 'none') {
    imagePreview.style.filter = DEFAULT_EFFECT.style;
  }
};

noUiSlider.create(levelSlider, {
  range: {
    min: DEFAULT_EFFECT.min,
    max: DEFAULT_EFFECT.max,
  },
  step: DEFAULT_EFFECT.step,
  start: DEFAULT_EFFECT.min,
});

effectsList.addEventListener('click', clickOnEffectsList);
levelSlider.noUiSlider.on('update', updateOnSlider);

export { resetFilter, resetSlider };
