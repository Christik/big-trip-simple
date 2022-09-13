import Mode from '../enum/mode.js';
import PointType from '../enum/point-type.js';
import PointLabel from '../enum/point-label.js';
import DateFormat from '../enum/date-format.js';
import Presenter from './presenter.js';
import PointAdapter from '../adapter/point-adapter.js';

const SubmitButtonText = {
  ACTIVE: 'Save',
  INACTIVE: 'Saving...'
};

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

    this.point = this.getEmptyPoint();

    this.buildTypeSelectView();
    this.buildDestinationSelectView();
    this.buildDatePickerView();

    this.view.pointTypeSelectView.addEventListener(
      'change',
      this.onTypeSelectChange.bind(this)
    );

    this.view.destinationSelectView.addEventListener(
      'change',
      this.updateDestinationView.bind(this)
    );

    this.model.addEventListener('mode', this.onModelModeChange.bind(this));
    this.view.addEventListener('reset', this.onViewReset.bind(this));
    this.view.addEventListener('close', this.onViewClose.bind(this));
    this.view.addEventListener('submit', this.onViewSubmit.bind(this));
  }

  buildTypeSelectView() {
    /** @type {[string, string][]} */
    const options = Object.values(PointType).map((value) => {
      const key = PointType.findKey(value);
      const label = PointLabel[key];

      return [label, value];
    });

    this.view.pointTypeSelectView.setOptions(options);
  }

  buildDestinationSelectView() {
    /** @type {[string, string][]} */
    const options = this.model.destinations.listAll().map(
      (item) => ['', item.name]
    );

    this.view.destinationSelectView
      .setOptions(options);
  }

  buildDatePickerView() {
    this.view.datePickerView.configure({
      dateFormat: DateFormat.DATE_TIME,
      locale: {firstDayOfWeek: 1}
    });
  }

  buildOfferSelectView() {
    const type = this.view.pointTypeSelectView.getValue();
    const availableOffers = this.model.offerGroups.findById(type).items;

    /** @type {[number, string, number][]} */
    const options = availableOffers.map((offer) => [offer.id, offer.title, offer.price]);

    this.view.offerSelectView
      .set('hidden', !availableOffers.length)
      .setOptions(options);
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
    const {basePrice} = this.point;

    if (basePrice) {
      this.view.priceInputView.setValue(String(basePrice));
    }
  }

  updateOfferSelectView() {
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
    this.buildOfferSelectView();
    this.updateOfferSelectView();
    this.updateDestinationView();

    return this;
  }

  getEmptyPoint() {
    const point = new PointAdapter();

    point.type = PointType.TAXI;
    point.destinationId = this.model.destinations.listAll()[0].id;
    point.startDate = String(new Date());
    point.endDate = String(new Date());
    point.basePrice = null;
    point.offerIds = [];

    return point;
  }

  getFormData() {
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

  /**
   * @param {HTMLButtonElement} buttonView
   * @param {{ACTIVE: string, INACTIVE: string}} ButtonText
   */
  toggleButtonDisable(buttonView, ButtonText) {
    const isDisabled = buttonView.disabled;

    buttonView.disabled = !isDisabled;
    buttonView.textContent = isDisabled ? ButtonText.ACTIVE : ButtonText.INACTIVE;
  }

  onTypeSelectChange() {
    const type = this.view.pointTypeSelectView.getValue();
    const typeLabel = PointLabel[PointType.findKey(type)];

    this.view.destinationSelectView.setLabel(typeLabel);
    this.buildOfferSelectView();
  }

  onModelModeChange() {
    if (this.model.getMode() === Mode.CREATE) {
      this.updateView();
      this.view.open();
    }
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

    this.toggleButtonDisable(this.view.submitButtonView, SubmitButtonText);

    try {
      await this.model.points.add(this.getFormData());
      this.view.close();

    } catch (exception) {
      // shake
    }

    this.toggleButtonDisable(this.view.submitButtonView, SubmitButtonText);
  }
}
