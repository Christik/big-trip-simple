import Enum from './enum.js';

// TODO: переименовать в compare
export default class SortPredicate extends Enum {
  /**
   * @type {Compare<PointAdapter>}
   */
  static DAY = (point, nextPoint) =>
    Date.parse(point.startDate) - Date.parse(nextPoint.startDate);

  /**
   * @type {Compare<PointAdapter>}
   */
  static PRICE = (point, nextPoint) => nextPoint.basePrice - point.basePrice;
}
