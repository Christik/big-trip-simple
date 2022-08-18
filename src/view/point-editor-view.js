import BaseView from './base-view.js';
import { createPointEditorView } from './templates/point-editor-template.js';
import { isKeyEscape } from '../utils.js';

/**
 * Представление формы редактирования точки маршрута
 */
export default class PointEditorView extends BaseView {
  #linked = null;

  bodyView = this.querySelector('.event__details');
  offersContainerView = this.querySelector('.event__section--offers');

  constructor() {
    super();

    const expandButtonView = this.querySelector('.event__rollup-btn');

    expandButtonView.addEventListener('click', () => {
      this.close();
    });
  }

  /**
   * @override
   */
  createView() {
    return createPointEditorView();
  }

  /**
   * Создает связь между текущей формой и точкой маршрута
   * @param {HTMLElement} view
   */
  link(view) {
    this.#linked = view;

    return this;
  }

  /**
   * Отрисовывает форму вместо точки маршрута
   */
  open() {
    this.#linked.replaceWith(this);
    document.addEventListener('keydown', this);

    return this;
  }

  /**
   * Закрывает форму и отрисовывает точку маршрута
   */
  close() {
    this.replaceWith(this.#linked);
    document.removeEventListener('keydown', this);

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
   * @param {string} type
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
    const areOffersEmpty = (offerViews.length === 0);

    if (areOffersEmpty) {
      this.offersContainerView?.remove();

      return this;
    }

    const isOffersContainerNotExist = !this.bodyView.contains(this.offersContainerView);

    if (isOffersContainerNotExist) {
      this.bodyView.prepend(this.offersContainerView);
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

  /**
   * Обработчик нажатия клавиши Escape
   */
  handleEvent(event) {
    if (isKeyEscape(event)) {
      this.close();
    }
  }
}

customElements.define('trip-point-editor', PointEditorView);
