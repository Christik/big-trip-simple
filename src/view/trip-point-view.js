import BaseView from './base-view.js';
import { createAdjacentHtmlPoint } from './trip-point-template.js';

export default class TripPointView extends BaseView {
  /**
   * @override
   */
  createAdjacentHtml() {
    return createAdjacentHtmlPoint(...arguments);
  }
}

customElements.define('trip-point', TripPointView);
