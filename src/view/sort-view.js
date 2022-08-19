import BaseView from './base-view.js';
import { createSortTemplate } from './templates/sort-template.js';

export default class SortView extends BaseView {
  /**
   * @override
   */
  createTemplate() {
    return createSortTemplate();
  }
}

customElements.define('trip-sort', SortView);
