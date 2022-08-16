/**
 * Базовое представление
 */
export default class BaseView extends HTMLElement {
  constructor() {
    super();
    this.insertAdjacentHTML(this.insertionPosition, this.createTemplate());
  }

  /**
   * Позиция дополнительной html-разметки
   */
  get insertionPosition() {
    return 'beforeend';
  }

  /**
   * Создает дополнительную html-разметку
   * @return {string}
   */
  createTemplate() {
    return '';
  }

  /**
   * Устанавливает новые или обновляет существующие свойства внутреннего элемента
   * @param {string} selector
   * @param {number | string | Object} properties
   * @return {BaseView}
   */
  set(selector, properties) {
    const element = this.querySelector(selector);
    const isString = (typeof properties === 'string');
    const isNumber = Number.isFinite(properties);

    if (isString || isNumber) {
      properties = { textContent: properties };
    }

    Object.assign(element, properties);

    return this;
  }
}
