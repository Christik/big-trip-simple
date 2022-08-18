import BaseView from './base-view.js';
import { createTypeListItemView } from './templates/type-list-item-template.js';

/**
 * Представление пункта из списка типов
 */
export default class TypeListItemView extends BaseView {
  constructor() {
    super();
    this.classList.add('event__type-item');
  }

  /**
   * @override
   */
  createView() {
    return createTypeListItemView();
  }

  /**
   * Устанавливает id и значение у input
   * @param {PointType} type
   * @param {boolean} isChecked
   */
  setInput(type, isChecked) {
    /**
     * @type {HTMLInputElement}
     */
    const view = this.querySelector('.event__type-input');

    view.id = `event-type-${type}-1`;
    view.value = type;
    view.checked = isChecked;

    return this;
  }

  /**
   * Устанавливает заголовок
   * @param {PointType} type
   * @param {string} title
   */
  setLabel(type, title) {
    /**
     * @type {HTMLLabelElement}
     */
    const view = this.querySelector('.event__type-label');

    view.className = `event__type-label event__type-label--${type}`;
    view.htmlFor = `event-type-${type}-1`;
    view.textContent = title;

    return this;
  }
}

customElements.define('trip-type-list-item', TypeListItemView);
