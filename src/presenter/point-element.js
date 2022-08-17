import PointOfferView from '../view/point-offer-view.js';
import PointView from '../view/point-view.js';
import { formatDate } from '../utils.js';

/**
 * Создает DOM-элемент оффера
 * @param {Object} offer
 * @returns {PointOfferView}
 */
const createOfferElement = (offer) => (
  new PointOfferView()
    .setTitle(offer.title)
    .setPrice(offer.price)
);

/**
 * Создает массив с DOM-элементами офферов
 * @param {Object[]} offers
 * @return {PointOfferView[]}
 */
const createOfferElements = (offers) => offers.map((offer) => createOfferElement(offer));

/**
 * Создает DOM-элемент точки маршрута
 * @param {Object} point
 * @returns {PointView}
 */
export const createPointElement = (point) => {
  const element = new PointView();
  const title = `${point.type} ${point.destination.name}`;
  const dateForHuman = formatDate(point.dateFrom, 'MMM D');
  const dateForMachine = formatDate(point.dateFrom, 'YYYY-MM-DD');
  const startTimeForHuman = formatDate(point.dateFrom, 'HH:mm');
  const startTimeForMachine = formatDate(point.dateFrom, 'YYYY-MM-[DD]T[HH]:mm');
  const endTimeForHuman = formatDate(point.dateTo, 'HH:mm');
  const endTimeForMachine = formatDate(point.dateTo, 'YYYY-MM-[DD]T[HH]:mm');
  const offerElements = createOfferElements(point.offers);

  return element
    .setTitle(title)
    .setIcon(point.type)
    .setDate(dateForHuman, dateForMachine)
    .setStartTime(startTimeForHuman, startTimeForMachine)
    .setEndTime(endTimeForHuman, endTimeForMachine)
    .setPrice(point.basePrice)
    .insertOffers(offerElements);
};
