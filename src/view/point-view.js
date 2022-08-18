import BaseView from './base-view.js';
import { createPointView } from './templates/point-template.js';

/**
 * Представление точки маршрута
 */
export default class PointView extends BaseView {
  constructor() {
    super();

    const expandButtonView = this.querySelector('.event__rollup-btn');

    expandButtonView.addEventListener('click', () => {
      const expandEvent = new CustomEvent('expand');
      this.dispatchEvent(expandEvent);
    });
  }

  /**
   * @override
   */
  createView() {
    return createPointView();
  }

  /**
   * Устанавливает заголовок
   * @param {string} title
   */
  setTitle(title) {
    const view = this.querySelector('.event__title');

    view.textContent = title;

    return this;
  }

  /**
   * Устанавливает имя иконки
   * @param {PointType} name
   */
  setIcon(name) {
    /**
     * @type {HTMLImageElement}
     */
    const view = this.querySelector('.event__type-icon');

    view.src = `img/icons/${name}.png`;

    return this;
  }

  /**
   * Устанавливает дату
   * @param {string} dateForHuman
   * @param {string} dateForMachine
   */
  setDate(dateForHuman, dateForMachine) {
    /**
     * @type {HTMLTimeElement}
     */
    const view = this.querySelector('.event__date');

    view.textContent = dateForHuman;
    view.dateTime = dateForMachine;

    return this;
  }

  /**
   * Устанавливает время начала
   * @param {string} timeForHuman
   * @param {string} timeForMachine
   */
  setStartTime(timeForHuman, timeForMachine) {
    /**
     * @type {HTMLTimeElement}
     */
    const view = this.querySelector('.event__start-time');

    view.textContent = timeForHuman;
    view.dateTime = timeForMachine;

    return this;
  }

  /**
   * Устанавливает время окончания
   * @param {string} timeForHuman
   * @param {string} timeForMachine
   */
  setEndTime(timeForHuman, timeForMachine) {
    /**
     * @type {HTMLTimeElement}
     */
    const view = this.querySelector('.event__end-time');

    view.textContent = timeForHuman;
    view.dateTime = timeForMachine;

    return this;
  }

  /**
   * Устанавливает цену
   * @param {string} price
   */
  setPrice(price) {
    const view = this.querySelector('.event__price-value');

    view.textContent = price;

    return this;
  }

  /**
   * Добавляет DOM-элементы оферов
   * @param {...HTMLElement} offerViews
   */
  replaceOffers(...offerViews) {
    const view = this.querySelector('.event__selected-offers');

    view.replaceChildren(...offerViews);

    return this;
  }
}

customElements.define('trip-point', PointView);
