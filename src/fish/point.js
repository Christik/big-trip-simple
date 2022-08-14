import {
  getRandomInteger,
  getRandomArrayElement,
  createRandomizerOfUniqueInteger,
  createCounter } from '../utils.js';
import { POINT_TYPES } from '../const.js';
import { getOffersByType } from './offersByType.js';
import { generateDestinations } from './destinations.js';
import dayjs from 'dayjs';

const offersByType = getOffersByType();

const allDestinations = generateDestinations();

const generateBasePrice = () => {
  const randomNumber = getRandomInteger(1, 30);

  return randomNumber * 100;
};

const generateDateFrom = () => {
  const maxDaysGap = 5;
  const daysGap = getRandomInteger(-maxDaysGap, maxDaysGap);

  return dayjs().add(daysGap).format();
};

const generateDateTo = (dateFrom) => {
  const maxDaysGap = 3;
  const hoursGap = getRandomInteger(0, maxDaysGap * 24 * 60);

  return dayjs(dateFrom).add(hoursGap, 'minute').format();
};

const generatePointId = createCounter();

const generatePointType = (types) => getRandomArrayElement(types);

const generatePointOffers = (pointType) => {
  const pointOffers = [];
  const offersByCurrentType = offersByType.find(({type}) => (type === pointType));
  const possibleOffers = offersByCurrentType.offers;

  if (possibleOffers.length === 0) {
    return pointOffers;
  }

  const offersLength = getRandomInteger(0, possibleOffers.length);

  if (offersLength === 0) {
    return pointOffers;
  }

  if (possibleOffers.length === 1) {
    return possibleOffers[0].id;
  }

  const getOfferIndex = createRandomizerOfUniqueInteger(0, possibleOffers.length - 1);

  for (let i = 0; i < offersLength; i++) {
    const offerIndex = getOfferIndex();
    const offerId = possibleOffers[offerIndex].id;

    pointOffers.push(offerId);
  }

  return pointOffers;
};

const generatePointDestinationId = (destinations) => {
  if (destinations.length === 1) {
    return destinations[0].id;
  }

  const destination = getRandomArrayElement(destinations);

  return destination.id;
};

const generatePoint = () => {
  const type = generatePointType(POINT_TYPES);
  const offers = generatePointOffers(type);
  const dateFrom = generateDateFrom();
  const dateTo = generateDateTo(dateFrom);

  return {
    basePrice: generateBasePrice(),
    dateFrom,
    dateTo,
    destination: generatePointDestinationId(allDestinations),
    id: generatePointId(),
    offers,
    type,
  };
};

generatePoint();

export { generatePoint };
