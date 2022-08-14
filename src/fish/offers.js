import { generateOffer } from './offer.js';
import { getRandomInteger } from '../utils';
import { POINT_TYPES } from '../const.js';

const generateOfferList = (listLength) => {
  const offers = [];

  for (let i = 0; i < listLength; i++) {
    offers.push(generateOffer(i + 1));
  }

  return offers;
};

const generateOffersByType = () => {
  const offers = [];

  for (const pointType of POINT_TYPES) {
    const listLength = getRandomInteger(0, 5);
    const obj = {
      type: pointType,
      offers: generateOfferList(listLength),
    };

    offers.push(obj);
  }

  return offers;
};

const offersByType = generateOffersByType();

const getAllTypeOffers = () => offersByType;

export { getAllTypeOffers };
