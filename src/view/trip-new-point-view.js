import BaseView from './base-view.js';
import { createAdjacentHtmlNewPoint } from './trip-new-point-template.js';

export default class TripNewPointView extends BaseView {
  /**
   * @override
   */
  createAdjacentHtml() {
    return createAdjacentHtmlNewPoint(...arguments);
  }
}

customElements.define('trip-new-point', TripNewPointView);
