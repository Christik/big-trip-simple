import BaseView from './base-view.js';
import { createPointEditorView } from './point-editor-template.js';

/**
 * Представление формы редактирования точки маршрута
 */
export default class PointEditorView extends BaseView {
  constructor() {
    super();
  }

  /**
   * @override
   */
  createView() {
    return createPointEditorView();
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
   * Отрисовывает выпадающий список типов
   * @param {HTMLElement[]} typeViews
   */
  replaceTypeList(...typeViews) {
    const listView = this.querySelector('.event__type-group');

    listView.replaceChildren(...typeViews);

    return this;
  }

  /**
   * Устанавливает название типа
   * @param {PointType} type
   */
  setTypeName(type) {
    const view = this.querySelector('.event__type-output');

    view.textContent = type;

    return this;
  }

  /**
   * Устанавливает пункт назначения
   * @param {string} destination
   */
  setDestinationInput(destination) {
    /**
     * @type {HTMLInputElement}
     */
    const view = this.querySelector('.event__input--destination');

    view.value = destination;

    return this;
  }

  /**
   * Устанавливает время начала
   * @param {string} time
   */
  setStartTime(time) {
    /**
     * @type {HTMLInputElement}
     */
    const view = this.querySelector('[name="event-start-time"]');

    view.value = time;

    return this;
  }

  /**
   * Устанавливает время окончания
   * @param {string} time
   */
  setEndTime(time) {
    /**
     * @type {HTMLInputElement}
     */
    const view = this.querySelector('[name="event-end-time"]');

    view.value = time;

    return this;
  }

  /**
   * Устанавливает цену
   * @param {number} price
   */
  setPrice(price) {
    /**
     * @type {HTMLInputElement}
     */
    const view = this.querySelector('.event__input--price');

    view.value = String(price);

    return this;
  }

  /**
   * Отрисовывает список офферов
   * @param {HTMLElement[]} offerViews
   */
  replaceOffers(...offerViews) {
    const containerView = this.querySelector('.event__section--offers');

    if (offerViews.length === 0) {
      containerView.remove();

      return this;
    }

    const listView = this.querySelector('.event__available-offers');

    listView.replaceChildren(...offerViews);

    return this;
  }

  /**
   * Устанавливает описание города
   * @param {string} description
   */
  setDestinationDescription(description) {
    const view = this.querySelector('.event__destination-description');

    view.textContent = description;

    return this;
  }
}

customElements.define('trip-point-editor', PointEditorView);
