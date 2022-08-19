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
   */
  get insertPosition() {
    return 'beforeend';
  }

  /**
   * Создает дополнительную html-разметку
   * @return {string}
   */
  createTemplate() {
    return '';
  }
}
