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
  const offersByType = [];

  for (const pointType of POINT_TYPES) {
    const listLength = getRandomInteger(0, 5);
    const obj = {
      type: pointType,
      offers: generateOfferList(listLength),
    };

    offersByType.push(obj);
  }

  return offersByType;
};

const getOffersByType = () => generateOffersByType();

export { getOffersByType };
