import BaseView from './base-view.js';
import { createTypeListItemTemplate } from './type-list-item-template.js';

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
  createTemplate() {
    return createTypeListItemTemplate();
  }

  /**
   * Устанавливает id и значение инпута
   * @param {string} type
   * @return {TypeListItemView}
   */
  setInput(type, isChecked) {
    const properties = {
      id: `event-type-${type}-1`,
      value: type,
      checked: isChecked,
    };

    return this.set('.event__type-input', properties);
  }

  setLabel(type, title) {
    const properties = {
      className: `event__type-label event__type-label--${type}`,
      for: `event-type-${type}-1`,
      textContent: title,
    };

    return this.set('.event__type-label', properties);
  }
}

customElements.define('trip-type-list-item', TypeListItemView);
