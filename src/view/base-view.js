/**
 * Базовое представление
 */
export default class BaseView extends HTMLElement {
  constructor() {
    super();
    this.insertAdjacentHTML(this.insertPosition, this.createTemplate());
  }

  /**
   * Позиция дополнительной html-разметки
   * @type {any}
   */
  get insertPosition() {
    return 'beforeend';
  }

  /**
   * Создает дополнительную html-разметку
   */
  createTemplate() {
    return '';
  }
}
