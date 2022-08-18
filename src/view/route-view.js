import BaseView from './base-view.js';
import { createRouteView } from './templates/route-template.js';

/**
 * Представление маршрута со списком точек остановки
 */
export default class RouteView extends BaseView {
  constructor() {
    super();
    this.classList.add('trip-events');
  }

  /**
   * @override
   */
  createView() {
    return createRouteView();
  }
}

customElements.define('trip-route', RouteView);
