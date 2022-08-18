import BaseView from './base-view.js';
import { createSortView } from './templates/sort-template.js';

export default class SortView extends BaseView {
  /**
   * @override
   */
  createView() {
    return createSortView();
  }
}

customElements.define('trip-sort', SortView);
