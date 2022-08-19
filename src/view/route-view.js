import BaseView from './base-view.js';

/**
 * Представление маршрута со списком точек остановки
 */
export default class RouteView extends BaseView {
  /**
   * Отрисовывает новое содержимое маршрута
   * @param {...HTMLElement} views
   */
  replaceContent(...views) {
    this.replaceChildren(...views);

    return this;
  }
}

customElements.define('trip-route', RouteView);
