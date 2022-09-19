import Mode from '../enum/mode.js';
import PointType from '../enum/point-type.js';
import PointLabel from '../enum/point-label.js';
import DateFormat from '../enum/date-format.js';
import Presenter from './presenter.js';
import PointAdapter from '../adapter/point-adapter.js';
import DatePickerView from '../view/date-picker-view.js';

DatePickerView.configure({
  'enableTime': true,
  'time_24hr': true,
  'dateFormat': DateFormat.DATE_TIME,
  'locale': {firstDayOfWeek: 1}
});

/**
 * @template {ApplicationModel} Model
 * @template {CreatorView} View
 * @extends {Presenter<Model,View>}
 */
export default class CreatorPresenter extends Presenter {
  /**
   * @param {[model: Model, view: View]} args
   */
  constructor(...args) {
    super(...args);

    this.point = null;

    this.buildView();

    this.view.pointTypeSelectView.addEventListener('change', this.onPointTypeSelectChange.bind(this));
    this.view.destinationSelectView.addEventListener('change', this.updateDestinationView.bind(this));

    this.model.addEventListener('mode', this.onModelModeChange.bind(this));
    this.view.addEventListener('reset', this.onViewReset.bind(this));
    this.view.addEventListener('close', this.onViewClose.bind(this));
    this.view.addEventListener('submit', this.onViewSubmit.bind(this));
  }

  get activePoint() {
    const point = new PointAdapter();
    const destinationName = this.view.destinationSelectView.getValue();
    const [startDate, endDate] = this.view.datePickerView.getDates();

    point.type = this.view.pointTypeSelectView.getValue();
    point.destinationId = this.model.destinations.findBy('name', destinationName)?.id;
    point.startDate = startDate;
    point.endDate = endDate;
    point.basePrice = Number(this.view.priceInputView.getValue());
    point.offerIds = this.view.offerSelectView.getSelectedValues().map(Number);
    point.isFavorite = false;

    return point;
  }

  buildView() {
    /** @type {[string, string][]} */
    const pointTypeSelectOptions = Object.values(PointType).map((value) => {
      const key = PointType.findKey(value);
      const label = PointLabel[key];

      return [label, value];
    });

    /** @type {[string, string][]} */
    const destinationSelectOptions = this.model.destinations.listAll()
      .map((item) => ['', item.name]);

    this.view.pointTypeSelectView.setOptions(pointTypeSelectOptions);
    this.view.destinationSelectView.setOptions(destinationSelectOptions);
  }

  updateTypeSelectView() {
    this.view.pointTypeSelectView.setValue(this.point.type);
  }

  updateDestinationSelectView() {
    const label = PointLabel[PointType.findKey(this.point.type)];
    const destination = this.model.destinations.findById(this.point.destinationId);

    this.view.destinationSelectView
      .setLabel(label)
      .setValue(destination.name);
  }

  updateDatePickerView() {
    const {startDate, endDate} = this.point;

    this.view.datePickerView.setDates(startDate, endDate);
  }

  updatePriceInput() {
    this.view.priceInputView.setValue(String(this.point.basePrice));
  }

  updateOfferSelectView() {
    const type = this.view.pointTypeSelectView.getValue();
    const availableOffers = this.model.offerGroups.findById(type).items;

    /** @type {[number, string, number][]} */
    const options = availableOffers.map((offer) => [offer.id, offer.title, offer.price]);

    this.view.offerSelectView
      .set('hidden', !availableOffers.length)
      .setOptions(options);
  }

  updateOfferSelectCheckedView() {
    const type = this.view.pointTypeSelectView.getValue();
    const availableOffers = this.model.offerGroups.findById(type).items;
    const optionsChecked = availableOffers.map(
      (offer) => (this.point.offerIds.includes(offer.id))
    );

    this.view.offerSelectView.setOptionsChecked(optionsChecked);
  }

  updateDestinationView() {
    const name = this.view.destinationSelectView.getValue();
    const destination = this.model.destinations.findBy('name', name);

    /** @type {[string, string][]} */
    const pictureOptions = destination.pictures.map(
      ({ src, description }) => [ src, description ]
    );

    this.view.destinationView
      .setDescription(destination.description)
      .setPictures(pictureOptions);
  }

  updateView() {
    this.updateTypeSelectView();
    this.updateDestinationSelectView();
    this.updateDatePickerView();
    this.updatePriceInput();
    this.updateOfferSelectView();
    this.updateOfferSelectCheckedView();
    this.updateDestinationView();

    return this;
  }

  saveActivePoint() {
    return this.model.points.add(this.activePoint);
  }

  onPointTypeSelectChange() {
    const type = this.view.pointTypeSelectView.getValue();
    const typeLabel = PointLabel[PointType.findKey(type)];

    this.view.destinationSelectView.setLabel(typeLabel);
    this.updateOfferSelectView();
  }

  onModelModeChange() {
    this.point = this.model.activePoint;

    if (this.model.getMode() === Mode.CREATE) {
      this.updateView();
      this.view.open();

      return;
    }

    this.view.close(true);
  }

  onViewClose() {
    this.model.setMode(Mode.VIEW);
  }

  async onViewReset(event) {
    event.preventDefault();

    this.view.close();
  }

  async onViewSubmit(event) {
    event.preventDefault();

    this.view.block();
    this.view.setSaveButtonPressed(true);

    try {
      await this.saveActivePoint();
      this.view.close();

    } catch (exception) {
      this.view.shake();
    }

    this.view.setSaveButtonPressed(false);
    this.view.unblock();
  }
}
