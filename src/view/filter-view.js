import BaseView from './base-view.js';
import { createFilterTemplate } from './templates/filter-template.js';

export default class FilterView extends BaseView {
  /**
   * @override
   */
  createTemplate() {
    return createFilterTemplate();
  }
}

customElements.define('trip-filter', FilterView);
