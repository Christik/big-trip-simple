import BaseView from './base-view.js';
import { createNewPointView } from './templates/new-point-template.js';

export default class NewPointView extends BaseView {
  /**
   * @override
   */
  createView() {
    return createNewPointView();
  }
}

customElements.define('trip-new-point', NewPointView);
