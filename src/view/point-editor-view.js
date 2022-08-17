import BaseView from './base-view.js';
import { createPointEditorTemplate } from './point-editor-template.js';

/**
 * Представление формы редактирования точки маршрута
 */
export default class PointEditorView extends BaseView {
  /**
   * @override
   */
  createTemplate() {
    return createPointEditorTemplate();
  }

  /**
   * Устанавливает имя иконки
   * @param {string} name
   * @return {PointEditorView}
   */
  setIcon(name) {
    const url = `img/icons/${name}.png`;
    const properties = {
      src: url,
    };

    return this.set('.event__type-icon', properties);
  }

  /**
   * Отрисовывает выпадающий список типов
   * @param {HTMLElement[]} typeElements
   * @return {PointEditorView}
   */
  insertTypeList(typeElements) {
    const containerElement = this.querySelector('.event__type-group');
    const fragment = document.createDocumentFragment();

    typeElements.forEach((element) => fragment.append(element));

    containerElement.append(fragment);

    return this;
  }

  /**
   * Устанавливает название типа
   * @param {string} type
   * @return {PointEditorView}
   */
  setTypeName(type) {
    return this.set('.event__type-output', type);
  }

  /**
   * Устанавливает город назначения
   * @param {string} value
   * @return {PointEditorView}
   */
  setDestinationInput(value) {
    const properties = {
      value
    };

    return this.set('.event__input--destination', properties);
  }

  /**
   * Устанавливает время начала
   * @param {string} value
   * @return {PointEditorView}
   */
  setStartTime(value) {
    const properties = {
      value,
    };

    return this.set('[name="event-start-time"]', properties);
  }

  /**
   * Устанавливает время окончания
   * @param {string} value
   * @return {PointEditorView}
   */
  setEndTime(value) {
    const properties = {
      value,
    };

    return this.set('[name="event-end-time"]', properties);
  }

  /**
   * Устанавливает цену
   * @param {number | string} value
   * @return {PointEditorView}
   */
  setPrice(value) {
    const properties = {
      value,
    };

    return this.set('.event__input--price', properties);
  }

  /**
   * Отрисовывает список офферов
   * @param {HTMLElement[]} offerElements
   * @return {PointEditorView}
   */
  insertOffers(offerElements) {
    const containerElement = this.querySelector('.event__section--offers');

    if (offerElements.length === 0) {
      containerElement.remove();
      return this;
    }

    const listElement = this.querySelector('.event__available-offers');
    const fragment = document.createDocumentFragment();

    offerElements.forEach((element) => fragment.append(element));
    listElement.append(fragment);

    return this;
  }

  /**
   * Устанавливает описание города
   * @param {string} description
   * @return {PointEditorView}
   */
  setDestinationDescription(description) {
    return this.set('.event__destination-description', description);
  }
}

customElements.define('trip-point-editor', PointEditorView);
