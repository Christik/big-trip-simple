import BaseView from './base-view.js';
import { createRouteEmptyTemplate } from './templates/route-empty-template.js';

/**
 * Представление маршрута, когда список пуст
 */
export default class RouteEmptyView extends BaseView {
  /**
   * @override
   */
  createTemplate() {
    return createRouteEmptyTemplate();
  }
}

customElements.define('trip-route-empty', RouteEmptyView);
