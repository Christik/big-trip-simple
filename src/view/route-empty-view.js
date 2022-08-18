import BaseView from './base-view.js';
import { createRouteEmptyView } from './templates/route-empty-template.js';

/**
 * Представление маршрута, когда список пуст
 */
export default class RouteEmptyView extends BaseView {
  /**
   * @override
   */
  createView() {
    return createRouteEmptyView();
  }
}

customElements.define('trip-route-empty', RouteEmptyView);
