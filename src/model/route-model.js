import { generatePoint } from '../fish/point.js';
import { getOfferGroups } from '../fish/offerGroups.js';
import { getDestinations } from '../fish/destinations';
import PointAdapter from '../adapter/point-adapter.js';

/**
 * @template T
 * @param {T} target
 * @return {T}
 */
const clone = (target) => JSON.parse(JSON.stringify(target));

export default class RouteModel {
  /** @type {Point[]} */
  #pointCache = Array.from({length: 20}, generatePoint);

  /** @type {Destination[]} */
  #destinationCache = getDestinations();

  /** @type {OfferGroup[]} */
  #offerCache = getOfferGroups();

  get points() {
    return this.#pointCache.map((point) => new PointAdapter(point));
  }

  /** @param {string} id */
  getPointById(id) {
    const point = this.#pointCache.find((item) => (item.id === id));

    return new PointAdapter(point);
  }

  get offerGroups() {
    return getOfferGroups();
  }

  /** @param {PointType} type */
  getAvailableOffers(type) {
    return this.offerGroups
      .find((offerGroup) => (offerGroup.type === type))
      .offers;
  }

  /**
   * @param {PointType} type
   * @param {number[]} ids
   */
  getOffers(type, ids) {
    return this
      .getAvailableOffers(type)
      .filter((item) => ids.includes(item.id));
  }

  get destinations() {
    return clone(this.#destinationCache);
  }

  /** @param {number} id */
  getDestinationById(id) {
    const destination = this.#destinationCache.find((item) => (item.id === id));

    return clone(destination);
  }
}
