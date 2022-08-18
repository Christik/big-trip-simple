import { generatePoint } from '../fish/point.js';
import { getOfferGroups } from '../fish/offerGroups.js';
import { getDestinations } from '../fish/destinations';

export default class RouteModel {
  /**
   * Возвращает все группы оферов
   */
  get offerGroups() {
    return getOfferGroups();
  }

  /**
   * Возвращает массив со всеми оферами указанного типа
   * @param {PointType} type
   */
  getOffersByType(type) {
    return this.offerGroups.find((offerGroup) => (offerGroup.type === type)).offers;
  }

  /**
   * Возвращает все пункты назначения
   */
  get destinations() {
    return getDestinations();
  }

  /**
   * Возвращает все точки маршрута
   */
  get points() {
    const points = Array.from({length: 20}, generatePoint);

    return points.map((point) => {
      /**
       * @type {AggregatedPoint}
       */
      const aggregatePoint = {
        basePrice: point['base_price'],
        dateFrom: point['date_from'],
        dateTo: point['date_to'],
        id: point.id,
        type: point.type,
        offers: this.offerGroups.find((group) => (group.type === point.type)).offers.slice(0, 2),
        destination: this.destinations.find((destination) => destination.id === point.destination),
      };

      return aggregatePoint;
    });
  }
}
