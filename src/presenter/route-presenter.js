import RouteModel from '../model/route-model.js';
import RouteView from '../view/route-view.js';
import RouteEmptyView from '../view/route-empty-view.js';
import SortView from '../view/sort-view.js';
import PointListView from '../view/point-list-view.js';
import PointOfferView from '../view/point-offer-view.js';
import PointView from '../view/point-view.js';
import TypeListItemView from '../view/type-list-item-view.js';
import OfferToggleView from '../view/offer-toggle-view.js';
import PointEditorView from '../view/point-editor-view.js';
import { capitalizeFirstLetter, formatDate } from '../utils.js';
import {POINT_TYPES} from '../const.js';

/**
 * Презентер для маршрута со списком точек остановки
 */
export default class RoutePresenter {
  constructor() {
    this.model = new RouteModel();
    this.pointEditorView = new PointEditorView();
  }

  /**
  * Создает DOM-элемент оффера
  * @param {Offer} offer
  */
  createPointOfferView(offer) {
    return new PointOfferView()
      .setTitle(offer.title)
      .setPrice(offer.price);
  }

  /**
   * Создает массив с DOM-элементами офферов
   * @param {Offer[]} offers
   */
  createPointOfferViews(offers) {
    return offers.map(this.createPointOfferView);
  }

  /**
   * Создает DOM-элемент точки маршрута
   * @param {AggregatedPoint} point
   */
  createPointView(point) {
    const pointView = new PointView();
    const title = `${point.type} ${point.destination.name}`;
    const dateForHuman = formatDate(point.dateFrom, 'MMM D');
    const dateForMachine = formatDate(point.dateFrom, 'YYYY-MM-DD');
    const startTimeForHuman = formatDate(point.dateFrom, 'HH:mm');
    const startTimeForMachine = formatDate(point.dateFrom, 'YYYY-MM-[DD]T[HH]:mm');
    const endTimeForHuman = formatDate(point.dateTo, 'HH:mm');
    const endTimeForMachine = formatDate(point.dateTo, 'YYYY-MM-[DD]T[HH]:mm');
    const price = String(point.basePrice);
    const offerViews = this.createPointOfferViews(point.offers);

    pointView
      .setTitle(title)
      .setIcon(point.type)
      .setDate(dateForHuman, dateForMachine)
      .setStartTime(startTimeForHuman, startTimeForMachine)
      .setEndTime(endTimeForHuman, endTimeForMachine)
      .setPrice(price)
      .replaceOffers(...offerViews);

    pointView.addEventListener('expand', () => {
      this.pointEditorView.close();
      this.updatePointEditorView(point);
      this.pointEditorView
        .link(pointView)
        .open();
    });

    return pointView;
  }

  /**
   * Создает DOM-элемент пункта списка типов
   * @param {PointType} type
   * @param {boolean} isChecked
   */
  createTypeListItemView(type, isChecked = false) {
    const element = new TypeListItemView();
    const title = capitalizeFirstLetter(type);

    return element
      .setInput(type, isChecked)
      .setLabel(type, title);
  }

  /**
   * Создает список DOM-элементов для выпадающего списка типов
   * @param {PointType[]} types
   * @param {PointType} checkedType
   */
  createTypeListItemViews(types, checkedType) {
    return types.map((type) => {
      const isChecked = (type === checkedType);
      return this.createTypeListItemView(type, isChecked);
    });
  }

  /**
   * Создает DOM-элемент для переключателя оффера
   * @param {Offer} offer
   * @param {boolean} isChecked
   * @param {PointType} type
   */
  createOfferToggleView(offer, isChecked = false, type) {
    const element = new OfferToggleView();

    return element
      .setInput(offer.id, type, isChecked)
      .setTitle(offer.title)
      .setPrice(offer.price);
  }

  /**
   * Создает массив с DOM-элементами всех переключателей офферов
   * @param {Offer[]} checkedOffers
   * @param {PointType} type
   */
  createOfferToggleViews(checkedOffers, type) {
    const allOffers = this.model.getOffersByType(type);

    return allOffers.map((offer) => {
      const isChecked = checkedOffers.find((checkedOffer) => (checkedOffer.id === offer.id));
      return this.createOfferToggleView(offer, Boolean(isChecked), type);
    });
  }

  /**
   * Обновляет форму редактирования точки
   * @param {AggregatedPoint} point
   */
  updatePointEditorView(point) {
    const typeListItemViews = this.createTypeListItemViews(POINT_TYPES, point.type);
    const typeTitle = capitalizeFirstLetter(point.type);
    const offerViews = this.createOfferToggleViews(point.offers, point.type);

    const startDate = formatDate(point.dateFrom, 'DD/MM/YY');
    const startTime = formatDate(point.dateFrom, 'HH:mm');
    const startDateTime = `${startDate} ${startTime}`;

    const endDate = formatDate(point.dateTo, 'DD/MM/YY');
    const endTime = formatDate(point.dateTo, 'HH:mm');
    const endDateTime = `${endDate} ${endTime}`;

    return this.pointEditorView
      .setIcon(point.type)
      .replaceTypeList(...typeListItemViews)
      .setTypeName(typeTitle)
      .setDestinationInput(point.destination.name)
      .setStartTime(startDateTime)
      .setEndTime(endDateTime)
      .setPrice(point.basePrice)
      .replaceOffers(...offerViews)
      .setDestinationDescription(point.destination.description);
  }

  /**
   * Отрисовывает все точки маршрута
   * @param {Element} containerView
   */
  init(containerView) {
    const points = this.model.points;
    const routeView = new RouteView();
    const routeEmptyView = new RouteEmptyView();
    const sortView = new SortView();
    const pointListView = new PointListView();

    if (points.length === 0) {
      routeView.append(routeEmptyView);
    } else {
      points.forEach((point) => {
        const pointView = this.createPointView(point);

        pointListView.append(pointView);
      });

      routeView.append(sortView);
      routeView.append(pointListView);
    }

    containerView.append(routeView);
  }
}
