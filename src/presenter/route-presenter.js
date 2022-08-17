import RouteView from '../view/route-view.js';
import TypeListItemView from '../view/type-list-item-view.js';
import OfferSelectorView from '../view/offer-selector-view.js';
import PointEditorView from '../view/point-editor-view.js';
import PointView from '../view/point-view.js';
import PointOfferView from '../view/point-offer-view.js';
import PointsModel from '../model/points-model.js';
import OffersModel from '../model/offers-model.js';
import dayjs from 'dayjs';
import { capitalizeFirstLetter, humanizeTime, machinizeTime, humanizeDate, getOffersByType } from '../utils.js';
import {POINT_TYPES} from '../const.js';

/**
 * Создает DOM-элемент пункта списка типов
 * @param {string} type
 * @param {boolean} isChecked
 * @return {TypeListItemView}
 */
const createTypeListItemElement = (type, isChecked = false) => {
  const element = new TypeListItemView();
  const title = capitalizeFirstLetter(type);

  return element
    .setInput(type, isChecked)
    .setLabel(type, title);
};

/**
 * Создает список DOM-элементов для выпадающего списка типов
 * @param {string[]} types
 * @param {string} checkedType
 * @return {HTMLElement[]}
 */
const createTypeListItemElements = (types, checkedType) => types.map((type) => {
  const isChecked = (type === checkedType);
  return createTypeListItemElement(type, isChecked);
});

/**
 * Создает DOM-элемент для переключателя оффера
 * @param {Object} offer
 * @param {boolean} isChecked
 * @param {string} type
 * @return {HTMLElement}
 */
const createOfferSelectorElement = (offer, isChecked = false, type) => {
  const element = new OfferSelectorView();

  return element
    .setInput(offer.id, type, isChecked)
    .setTitle(offer.title)
    .setPrice(offer.price);
};

/**
 * Создает массив с DOM-элементами всех переключателей офферов
 * @param {Object[]} checkedOffers
 * @param {string} type
 * @return {HTMLElement[]}
 */
const createOfferSelectorElements = (checkedOffers, type) => {
  const offersModel = new OffersModel();
  const offerGroups = offersModel.get();
  const offers = getOffersByType(offerGroups, type);

  return offers.map((offer) => {
    const isChecked = checkedOffers.find((checkedOffer) => (checkedOffer.id === offer.id));
    return createOfferSelectorElement(offer, isChecked, type);
  });
};

/**
 * Создает форму редактирования точки
 * @param {Object} point
 * @return {PointEditorView}
 */
const createPointEditorElement = (point) => {
  const element = new PointEditorView();
  const typeListItems = createTypeListItemElements(POINT_TYPES, point.type);
  const typeTitle = capitalizeFirstLetter(point.type);
  const startDateTime = `${humanizeDate(point.dateFrom)} ${humanizeTime(point.dateFrom)}`;
  const endDateTime = `${humanizeDate(point.dateTo)} ${humanizeTime(point.dateTo)}`;
  const offerElements = createOfferSelectorElements(point.offers, point.type);

  return element
    .setIcon(point.type)
    .insertTypeList(typeListItems)
    .setTypeName(typeTitle)
    .setDestinationInput(point.destination.name)
    .setStartTime(startDateTime)
    .setEndTime(endDateTime)
    .setPrice(point.basePrice)
    .insertOffers(offerElements)
    .setDestinationDescription(point.destination.description);
};

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
    const pointsModel = new PointsModel();
    const points = pointsModel.get();
    const routeElement = new RouteView();
    const pointEditorElement = createPointEditorElement(points[0]);
    const fragment = document.createDocumentFragment();

    fragment.append(pointEditorElement);

    points.forEach((point) => {
      const pointElement = createPointElement(point);

      fragment.append(pointElement);
    });

    routeElement.append(fragment);
    containerElement.append(routeElement);
  }
}
