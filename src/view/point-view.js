import BaseView from './base-view.js';
import { createPointTemplate } from './point-template.js';

/**
 * Представление точки маршрута
 */
export default class PointView extends BaseView {
  /**
   * @override
   */
  createTemplate() {
    return createPointTemplate();
  }

  /**
   * Устанавливает заголовок
   * @param {string} title
   * @return {PointView}
   */
  setTitle(title) {
    const element = this.querySelector('.event__title');

    element.textContent = title;

    return this;
  }

  /**
   * Устанавливает имя иконки
   * @param {string} name
   * @return {PointView}
   */
  setIcon(name) {
    const element = this.querySelector('.event__type-icon');

    element.src = `img/icons/${name}.png`;

    return this;
  }

  /**
   * Устанавливает дату
   * @param {string} dateForHuman
   * @param {string} dateForMachine
   * @return {PointView}
   */
  setDate(dateForHuman, dateForMachine) {
    const element = this.querySelector('.event__date');

    element.textContent = dateForHuman;
    element.datetime = dateForMachine;

    return this;
  }

  /**
   * Устанавливает время начала
   * @param {string} timeForHuman
   * @param {string} timeForMachine
   * @return {PointView}
   */
  setStartTime(timeForHuman, timeForMachine) {
    const element = this.querySelector('.event__start-time');

    element.textContent = timeForHuman;
    element.datetime = timeForMachine;

    return this;
  }

  /**
   * Устанавливает время окончания
   * @param {string} timeForHuman
   * @param {string} timeForMachine
   * @return {PointView}
   */
  setEndTime(timeForHuman, timeForMachine) {
    const element = this.querySelector('.event__end-time');

    element.textContent = timeForHuman;
    element.datetime = timeForMachine;

    return this;
  }

  /**
   * Устанавливает цену
   * @param {number | string} price
   * @return {PointView}
   */
  setPrice(price) {
    const element = this.querySelector('.event__price-value');

    element.textContent = price;

    return this;
  }

  /**
   * Добавляет DOM-элементы оферов
   * @param {HTMLElement[]} offerElements
   * @return {PointView}
   */
  insertOffers(offerElements) {
    const containerElement = this.querySelector('.event__selected-offers');
    const fragment = document.createDocumentFragment();

    offerElements.forEach((offerElement) => fragment.append(offerElement));
    containerElement.append(fragment);

    return this;
  }
}

customElements.define('trip-point', PointView);
