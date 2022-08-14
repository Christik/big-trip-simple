import BaseView from './base-view.js';
import { createAdjacentHtmlPoint } from './trip-point-template.js';

export default class TripPointView extends BaseView {
  /**
   * @override
   */
  createAdjacentHtml(...args) {
    return createAdjacentHtmlPoint(...args);
  }
}

customElements.define('trip-point', TripPointView);
