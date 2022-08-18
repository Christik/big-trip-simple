import BaseView from './base-view.js';
import { createFilterView } from './filter-template.js';

export default class FilterView extends BaseView {
  /**
   * @override
   */
  createView() {
    return createFilterView();
  }
}

customElements.define('trip-filter', FilterView);
