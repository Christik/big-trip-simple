import Mode from '../enum/mode.js';
import FilterType from '../enum/filter-type.js';
import FilterLabel from '../enum/filter-label.js';
import FilterPredicate from '../enum/filter-predicate.js';
import Presenter from './presenter.js';

/**
 * @template {ApplicationModel} Model
 * @template {FilterView} View
 * @extends {Presenter<Model,View>}
 */
export default class FilterPresenter extends Presenter {
  /**
   * @param {[model: Model, view: View]} args
   */
  constructor(...args) {
    super(...args);

    /** @type {[string, string][]} */
    const options = Object.keys(FilterType).map(
      (key) => [FilterLabel[key], FilterType[key]]
    );

    this.view
      .setOptions(options)
      .setOptionsDisabled(this.getOptionsDisabled())
      .setValue(FilterType.default);

    this.view.addEventListener('change', this.onViewChange.bind(this));
    this.model.pointsModel.addEventListener(['add', 'remove', 'update', 'filter'], this.onModelPointsChange.bind(this));
    this.model.addEventListener('mode', this.onModelChange.bind(this));
  }

  getOptionsDisabled() {
    return Object.values(FilterPredicate).map((predicate) =>
      !this.model.pointsModel.list(predicate).length);
  }

  onViewChange() {
    const value = this.view.getValue();
    const predicate = FilterPredicate[FilterType.findKey(value)];

    this.model.pointsModel.setFilter(predicate);
  }

  onModelPointsChange() {
    this.view.setOptionsDisabled(this.getOptionsDisabled());
  }

  onModelChange() {
    const flags = this.getOptionsDisabled();

    if (this.model.getMode() !== Mode.VIEW) {
      flags.fill(true);
    }

    this.view.setOptionsDisabled(flags);
  }
}
