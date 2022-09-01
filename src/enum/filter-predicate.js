/** @typedef {import('../adapter/point-adapter').default} PointAdapter */

import Enum from './enum.js';

export default class FilterPredicate extends Enum {
  /**
   * @param {PointAdapter[]} points
   */
  static EVERYTHING = (points) => !(points.length > 0);

  /**
   * @param {PointAdapter[]} points
   */
  static FUTURE = (points) =>
    !points.find((point) => (Date.parse(point.endDate) > Date.now()));
}
