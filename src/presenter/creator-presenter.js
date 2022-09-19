import Mode from '../enum/mode.js';
import PointType from '../enum/point-type.js';
import PointLabel from '../enum/point-label.js';
import DateFormat from '../enum/date-format.js';
import Presenter from './presenter.js';
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

    this.buildView();

    this.view.pointTypeSelectView.addEventListener('change', this.onPointTypeSelectViewChange.bind(this));
    this.view.destinationSelectView.addEventListener('change', this.onDestinationSelectViewChange.bind(this));
    this.view.datePickerView.addEventListener('change', this.onDatePickerViewChange.bind(this));
    this.view.priceInputView.addEventListener('change', this.onPriceInputViewChange.bind(this));
    this.view.offerSelectView.addEventListener('change', this.onOfferSelectViewChange.bind(this));

    this.model.addEventListener('mode', this.onModelModeChange.bind(this));
    this.view.addEventListener('reset', this.onViewReset.bind(this));
    this.view.addEventListener('close', this.onViewClose.bind(this));
    this.view.addEventListener('submit', this.onViewSubmit.bind(this));
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
    this.view.pointTypeSelectView.setValue(this.model.activePoint.type);
  }

  updateDestinationSelectView() {
    const label = PointLabel[PointType.findKey(this.model.activePoint.type)];
    const destination = this.model.destinations.findById(this.model.activePoint.destinationId);

    this.view.destinationSelectView
      .setLabel(label)
      .setValue(destination.name);
  }

  updateDatePickerView() {
    const {startDate, endDate} = this.model.activePoint;

    this.view.datePickerView.setDates(startDate, endDate);
  }

  updatePriceInput() {
    this.view.priceInputView.setValue(String(this.model.activePoint.basePrice));
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
      (offer) => (this.model.activePoint.offerIds.includes(offer.id))
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
    return this.model.points.add(this.model.activePoint);
  }

  onPointTypeSelectViewChange() {
    const type = this.view.pointTypeSelectView.getValue();
    const typeLabel = PointLabel[PointType.findKey(type)];

    this.model.activePoint.type = type;

    this.view.destinationSelectView.setLabel(typeLabel);
    this.updateOfferSelectView();
  }

  onDestinationSelectViewChange() {
    const name = this.view.destinationSelectView.getValue();
    const destination = this.model.destinations.findBy('name', name);

    this.model.activePoint.destinationId = destination.id;

    this.updateDestinationView();
  }

  onDatePickerViewChange() {
    const [startDate, endDate] = this.view.datePickerView.getDates();

    this.model.activePoint.startDate = startDate;
    this.model.activePoint.endDate = endDate;
  }

  onPriceInputViewChange() {
    const price = this.view.priceInputView.getValue();

    this.model.activePoint.basePrice = Number(price);
  }

  onOfferSelectViewChange() {
    const offerIds = this.view.offerSelectView.getSelectedValues().map(Number);

    this.model.activePoint.offerIds = offerIds;
  }

  onModelModeChange() {
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
