/** @typedef {import('../model/route-model').default} RouteModel */

import { isDateAfterNow } from '../utils.js';
import FilterView from '../view/filter-view.js';

export default class FilterPresenter {
  /**
   * @param {RouteModel} model
   */
  constructor(model) {
    this.model = model;

    this.model.ready().then(() => {
      const filterContainerView = document.querySelector('.trip-controls__filters');
      const points = this.model.getPoints();
      const isEverythingEnable = (points.length > 0);
      const isFutureEnable = points.find((point) => isDateAfterNow(point.endDate));

      this.view = new FilterView(isEverythingEnable, isFutureEnable);
      filterContainerView.append(this.view);
    });
  }
}
