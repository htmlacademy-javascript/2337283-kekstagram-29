const ALERT_SHOW_TIME = 5000;

const showAlert = (message) => {
  const alert = document.createElement('div');
  alert.style.zIndex = '100';
  alert.style.position = 'absolute';
  alert.style.left = '0';
  alert.style.top = '30%';
  alert.style.right = '0';
  alert.style.padding = '10px 3px';
  alert.style.fontSize = '30px';
  alert.style.textAlign = 'center';
  alert.style.backgroundColor = 'red';

  alert.textContent = message;

  document.body.append(alert);

  setTimeout(() => {
    alert.remove();
  }, ALERT_SHOW_TIME);
};

//getting random number from stated range
const getRandomNumber = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  return Math.floor(Math.random() * (upper - lower + 1) + lower);
};

//getting random element from stated array
const getRandomArrayEllement = (elements) => elements[getRandomNumber(0, elements.length - 1)];


//generating ID
const getIDGenerator = (min, max) => {
  let num = min;
  return () => {
    if (num <= max) {
      return num++;
    }
  };
};

const isEscapeKey = (evt) => evt.key === 'Escape';

export { getRandomNumber, getRandomArrayEllement, getIDGenerator, isEscapeKey, showAlert };
