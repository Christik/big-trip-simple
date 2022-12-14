import SortType from '../enum/sort-type.js';
import SortLabel from '../enum/sort-label.js';
import SortDisabled from '../enum/sort-disabled.js';
import Presenter from './presenter.js';
import SortCompare from '../enum/sort-compare.js';
import Mode from '../enum/mode.js';

/**
 * @template {ApplicationModel} Model
 * @template {SortView} View
 * @extends {Presenter<Model,View>}
 */
export default class SortPresenter extends Presenter {
  /**
   * @param {[model: Model, view: View]} args
   */
  constructor(...args) {
    super(...args);

    this.buildView();

    this.view.addEventListener('change', this.onViewChange.bind(this));

    this.model.pointsModel.addEventListener(
      ['add', 'remove', 'filter'],
      this.onPointsModelChange.bind(this)
    );
  }

  buildView() {
    /** @type {SortOptionState[]} */
    const options = Object.keys(SortType).map(
      (key) => [SortLabel[key], SortType[key]]
    );

    this.view
      .setOptions(options)
      .setOptionsDisabled(Object.values(SortDisabled));

    this.updateViewValue();
    this.updateViewDisplay();
  }

  updateViewValue() {
    const compare = this.model.pointsModel.getSort();
    const type = SortType[SortCompare.findKey(compare)];

    this.view.setValue(type);
  }

  updateViewDisplay() {
    const {length} = this.model.pointsModel.list();

    this.view.display(Boolean(length));
  }

  onViewChange() {
    const value = this.view.getValue();
    const compare = SortCompare[SortType.findKey(value)];

    this.model.setMode(Mode.VIEW);
    this.model.pointsModel.setSort(compare);
  }

  /**
   * @param {CustomEvent} event
   */
  onPointsModelChange(event) {
    if (event.type === 'filter') {
      this.model.pointsModel.setSort(SortCompare.DAY, false);

      this.updateViewValue();
    }

    this.updateViewDisplay();
  }
}
