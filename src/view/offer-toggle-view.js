import BaseView from './base-view.js';
import { createOfferToggleView } from './templates/offer-toggle-template.js';

/**
 * Представление для чекбокса офера в форме точки маршрута
 */
export default class OfferToggleView extends BaseView {
  constructor() {
    super();
    this.classList.add('event__offer-selector');
  }

  /**
   * @override
   */
  createView() {
    return createOfferToggleView();
  }

  /**
   * Устанавливает значения для input[type=checkbox]
   * @param {number} id
   * @param {PointType} type
   * @param {boolean} isChecked
   */
  setInput(id, type, isChecked) {
    /**
     * @type {HTMLInputElement}
     */
    const inputView = this.querySelector('.event__offer-checkbox');
    /**
     * @type {HTMLLabelElement}
     */
    const labelView = this.querySelector('.event__offer-label');
    const uniqueName = `event-offer-${type}-${id}`;

    inputView.id = uniqueName;
    inputView.name = uniqueName;
    inputView.checked = isChecked;
    labelView.htmlFor = uniqueName;

    return this;
  }

  /**
   * Устанавливает название оффера
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

customElements.define('trip-offer-selector', OfferToggleView);
