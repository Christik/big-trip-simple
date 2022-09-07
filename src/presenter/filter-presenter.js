import Filter from '../enum/filter.js';
import FilterLabel from '../enum/filter-label.js';
import FilterDisabled from '../enum/filter-disabled.js';
import Presenter from './presenter.js';
import FilterPredicate from '../enum/filter-predicate.js';

/**
 * @template {ApplicationModel} Model
 * @template {FilterSelectView} View
 * @extends Presenter<Model,View>
 */
export default class FilterPresenter extends Presenter {
  /**
   * @param {[model: Model, view: View]} args
   */
  constructor(...args) {
    super(...args);

    const points = this.model.points.list();

    /** @type {[string, string][]} */
    const options = Object.keys(Filter).map(
      (key) => [FilterLabel[key], Filter[key]]
    );

    const optionsDisabled = Object.keys(Filter).map(
      (key) => FilterDisabled[key](points)
    );

    this.view
      .setOptions(options)
      .setOptionsDisabled(optionsDisabled)
      .setValue(Filter.EVERYTHING);

    this.view.addEventListener('change', this.onChange.bind(this));
  }

  onChange() {
    const value = this.view.getValue();
    const predicate = FilterPredicate[Filter.findKey(value)];

    this.model.points.setFilter(predicate);
  }
}
