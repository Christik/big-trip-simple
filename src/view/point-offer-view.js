import BaseView from './base-view.js';
import { createPointOfferTemplate } from './point-offer-template.js';

/**
 * Представление оффера в точке маршрута
 */
export default class PointOfferView extends BaseView {
  constructor() {
    super();
    this.classList.add('event__offer');
  }

  /**
   * @override
   */
  createTemplate() {
    return createPointOfferTemplate();
  }

  /**
   * Устанавливает заголовок
   * @param {string} title
   * @returns {PointOfferView}
   */
  setTitle(title) {
    return this.set('.event__offer-title', title);
  }

  /**
   * Устанавливает цену
   * @param {number | string} price
   * @returns {PointOfferView}
   */
  setPrice(price) {
    return this.set('.event__offer-price', price);
  }
}

customElements.define('trip-point-offer', PointOfferView);
