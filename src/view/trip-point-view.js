import BaseView from './base-view.js';
import { createAdjacentHtmlPoint } from './trip-point-template.js';

export default class TripPointView extends BaseView {
  /**
   * @override
   */
  createAdjacentHtml() {
    return createAdjacentHtmlPoint();
  }

  /**
   * Устанавливает заголовок
   * @param {string} title
   */
  setTitle(title) {
    return this.set('.event__title', title);
  }

  /**
   * Устанавливает имя иконки
   * @param {string} name
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
   */
  setPrice(price) {
    return this.set('.event__price-value', price);
  }

  /**
   * Добавляет DOM-элементы оферов
   * @param {HTMLElement[]} offerElements
   */
  insertOffers(offerElements) {
    const containerElement = this.querySelector('.event__selected-offers');
    const fragment = document.createDocumentFragment();

    offerElements.forEach((offerElement) => fragment.append(offerElement));
    containerElement.append(fragment);

    return this;
  }
}

customElements.define('trip-point', TripPointView);
