/**
 * Базовое представление
 */
export default class BaseView extends HTMLElement {
  constructor() {
    super();
    this.insertAdjacentHTML(this.insertPosition, this.createView());
  }

  /**
   * Позиция дополнительной html-разметки
   */
  get insertPosition() {
    return 'beforeend';
  }

  /**
   * Создает дополнительную html-разметку
   * @return {string}
   */
  createView() {
    return '';
  }
}
