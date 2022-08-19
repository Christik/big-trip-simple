import BaseView from './base-view.js';
import { createRouteTemplate } from './templates/route-template.js';

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
  createTemplate() {
    return createRouteTemplate();
  }
}

customElements.define('trip-route', RouteView);
