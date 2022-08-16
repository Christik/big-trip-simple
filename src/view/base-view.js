/**
 * Базовое представление
 */
export default class BaseView extends HTMLElement {
  constructor() {
    super();
    this.insertAdjacentHTML(this.adjacentHtmlPosition, this.createAdjacentHtml());
  }

  /**
   * Позиция дополнительной html-разметки
   */
  get adjacentHtmlPosition() {
    return 'beforeend';
  }

  /**
   * Создает дополнительную html-разметку
   * @return {string}
   */
  createAdjacentHtml() {
    return '';
  }

  /**
   * Устанавливает новые или обновляет существующие свойства внутреннего элемента
   * @param {string} selector
   * @param {string | Object} properties
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
