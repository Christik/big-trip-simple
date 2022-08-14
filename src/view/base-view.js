/**
 * Базовое представление
 */
export default class BaseView extends HTMLElement {
  constructor(...args) {
    super();
    this.insertAdjacentHTML(this.adjacentHtmlPosition, this.createAdjacentHtml(...args));
  }

  /**
   * Позиция дополнительной html-разметки
   */
  get adjacentHtmlPosition() {
    return 'beforeend';
  }

  /**
   * Создает дополнительную html-разметку
   */
  createAdjacentHtml() {
    return '';
  }
}
