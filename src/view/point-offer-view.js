import BaseView from './base-view.js';
import { createPointOfferView } from './templates/point-offer-template.js';

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
  createView() {
    return createPointOfferView();
  }

  /**
   * Устанавливает заголовок
   * @param {string} title
   */
  setTitle(title) {
    const view = this.querySelector('.event__offer-title');

    view.textContent = title;

    return this;
  }

  /**
   * Устанавливает цену
   * @param {number} price
   */
  setPrice(price) {
    const view = this.querySelector('.event__offer-price');

    view.textContent = String(price);

    return this;
  }
}

customElements.define('trip-point-offer', PointOfferView);
