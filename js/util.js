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

export {getRandomNumber, getRandomArrayEllement, getIDGenerator};
