const getRandomInteger = (from, to) => {
  if (to <= from) {
    throw new Error('Начальная точка диапазона должна быть меньше конечной точки диапазона');
  }

  return Math.floor(Math.random() * (to - from + 1)) + from;
};

const getRandomArrayElement = (elements) => {
  const maxIndex = elements.length - 1;
  const randomIndex = getRandomInteger(0, maxIndex);

  return elements[randomIndex];
};

const createRandomizerOfUniqueInteger = (from, to) => {
  const repeatedNumbers = [];

  return () => {
    let randomNumber = getRandomInteger(from, to);

    while (repeatedNumbers.includes(randomNumber)) {
      randomNumber = getRandomInteger(from, to);
    }

    repeatedNumbers.push(randomNumber);

    return randomNumber;
  };
};

const createCounter = () => {
  let count = 0;

  return () => ++count;
};

export {
  getRandomInteger,
  getRandomArrayElement,
  createRandomizerOfUniqueInteger,
  createCounter
};
