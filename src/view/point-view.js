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
    return this.set('.event__title', title);
  }

  /**
   * Устанавливает имя иконки
   * @param {string} name
   * @return {PointView}
   */
  setIcon(name) {
    const url = `img/icons/${name}.png`;
    const properties = {
      src: url,
    };

    return this.set('.event__type-icon', properties);
  }

  /**
   * Устанавливает дату
   * @param {string} dateForHuman
   * @param {string} dateForMachine
   * @return {PointView}
   */
  setDate(dateForHuman, dateForMachine) {
    const properties = {
      textContent: dateForHuman,
      datetime: dateForMachine,
    };

    return this.set('.event__date', properties);
  }

  /**
   * Устанавливает время начала
   * @param {string} timeForHuman
   * @param {string} timeForMachine
   * @return {PointView}
   */
  setStartTime(timeForHuman, timeForMachine) {
    const properties = {
      textContent: timeForHuman,
      datetime: timeForMachine,
    };

    return this.set('.event__start-time', properties);
  }

  /**
   * Устанавливает время окончания
   * @param {string} timeForHuman
   * @param {string} timeForMachine
   * @return {PointView}
   */
  setEndTime(timeForHuman, timeForMachine) {
    const properties = {
      textContent: timeForHuman,
      datetime: timeForMachine,
    };

    return this.set('.event__end-time', properties);
  }

  /**
   * Устанавливает цену
   * @param {number | string} price
   * @return {PointView}
   */
  setPrice(price) {
    return this.set('.event__price-value', price);
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
