import BaseView from './base-view.js';
import { createRouteView } from './route-template.js';

/**
 * Представление маршрута со списком точек остановки
 */
export default class RouteView extends BaseView {
  /**
   * @override
   */
  createView() {
    return createRouteView();
  }
}

customElements.define('trip-route', RouteView);
