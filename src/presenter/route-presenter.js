import RouteView from '../view/route-view.js';
import PointView from '../view/point-view.js';
import PointOfferView from '../view/point-offer-view.js';
import RouteModel from '../model/points-model.js';
import dayjs from 'dayjs';
import { humanizeTime, machinizeTime } from '../utils.js';

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
 * @return {HTMLElement[]}
 */
const createOfferElements = (offers) => offers.map((offer) => createOfferElement(offer));

/**
 * Создает DOM-элемент точки маршрута
 * @param {Object} point
 * @returns {PointOfferView}
 */
const createPointElement = (point) => {
  const element = new PointView();
  const title = `${point.type} ${point.destination.name}`;
  const dateForHuman = dayjs(point.dateFrom).format('MMM D');
  const dateForMachine = dayjs(point.dateFrom).format('YYYY-MM-DD');
  const startTimeForHuman = humanizeTime(point.dateFrom);
  const startTimeForMachine = machinizeTime(point.dateFrom);
  const endTimeForHuman = humanizeTime(point.dateTo);
  const endTimeForMachine = machinizeTime(point.dateTo);
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

/**
 * Презентер для маршрута со списком точке остановки
 */
export default class RoutePresenter {
  /**
   * Отрисовывает все точки маршрута
   * @param {HTMLElement} containerElement
   */
  init(containerElement) {
    const model = new RouteModel();
    const points = model.get();
    const routeElement = new RouteView();
    const fragment = document.createDocumentFragment();

    points.forEach((point) => {
      const pointElement = createPointElement(point);

      fragment.append(pointElement);
    });

    routeElement.append(fragment);
    containerElement.append(routeElement);
  }
}
