import dayjs from 'dayjs';

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

const capitalizeFirstLetter = (text) => {
  const firstLetter = text[0].toUpperCase();
  const restText = text.slice(1);

  return `${firstLetter}${restText}`;
};

const getOffersByType = (offerGroups, type) => {
  const typeOffer = offerGroups.find((offerGroup) => (offerGroup.type === type));

  return typeOffer.offers;
};

const getOffersByIds = (offers, ids) => offers.filter((offer) => ids.includes(offer.id));

const getDestinationById = (destinations, id) => destinations.find((destination) => (destination.id === id));

const humanizeTime = (time) => dayjs(time).format('HH:mm');

const machinizeTime = (time) => dayjs(time).format('YYYY-MM-DDTHH:mm');

export {
  getRandomInteger,
  getRandomArrayElement,
  createRandomizerOfUniqueInteger,
  createCounter,
  capitalizeFirstLetter,
  getOffersByType,
  getOffersByIds,
  getDestinationById,
  humanizeTime,
  machinizeTime,
};
