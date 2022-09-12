import Mode from '../enum/mode.js';
import Type from '../enum/type.js';
import TypeLabel from '../enum/type-label.js';
import DateFormat from '../enum/date-format.js';
import Presenter from './presenter.js';
import PointAdapter from '../adapter/point-adapter.js';

/**
 * @template {ApplicationModel} Model
 * @template {EditorView} View
 * @extends {Presenter<Model,View>}
 */
export default class EditorPresenter extends Presenter {
  /**
   * @param {[model: Model, view: View]} args
   */
  constructor(...args) {
    super(...args);

    this.buildTypeSelectView();
    this.buildDestinationSelectView();
    this.buildDatePickerView();

    this.model.addEventListener('edit', this.onPointEdit.bind(this));
    this.view.addEventListener('reset', this.onViewReset.bind(this));
    this.view.addEventListener('close', () => {
      this.model.setMode(Mode.VIEW);
    });

    this.view.typeSelectView.addEventListener(
      'change',
      this.onTypeSelectChange.bind(this)
    );

    this.view.destinationSelectView.addEventListener(
      'change',
      this.updateDestinationDetailsView.bind(this)
    );

    this.view.addEventListener('submit', this.onViewSubmit.bind(this));
  }

  buildTypeSelectView() {
    /** @type {[string, PointType][]} */
    const options = Object.values(Type).map((value) => {
      const key = Type.findKey(value);
      const label = TypeLabel[key];

      return [label, value];
    });

    this.view.typeSelectView.setOptions(options);
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
    const type = this.view.typeSelectView.getValue();
    const availableOffers = this.model.offerGroups.findById(type).items;

    /** @type {[number, string, number][]} */
    const options = availableOffers.map((offer) => [offer.id, offer.title, offer.price]);

    this.view.offerSelectView.setOptions(options);
  }

  updateTypeSelectView() {
    this.view.typeSelectView.setValue(this.model.activePoint.type);
  }

  updateDestinationSelectView() {
    const label = TypeLabel[Type.findKey(this.model.activePoint.type)];
    const destination = this.model.destinations.findById(
      this.model.activePoint.destinationId
    );

    this.view.destinationSelectView
      .setLabel(label)
      .setValue(destination.name);
  }

  updateDatePickerView() {
    const {startDate, endDate} = this.model.activePoint;

    this.view.datePickerView.setDates(startDate, endDate);
  }

  updatePriceInput() {
    const {basePrice} = this.model.activePoint;

    this.view.priceInputView.setValue(String(basePrice));
  }

  updateOfferSelectView() {
    const type = this.view.typeSelectView.getValue();
    const availableOffers = this.model.offerGroups.findById(type).items;
    const optionsChecked = availableOffers.map(
      (offer) => (this.model.activePoint.offerIds.includes(offer.id))
    );

    this.view.offerSelectView.setOptionsChecked(optionsChecked);
  }

  updateDestinationDetailsView() {
    const name = this.view.destinationSelectView.getValue();
    const destination = this.model.destinations.findBy('name', name);

    /** @type {[string, string][]} */
    const pictureOptions = destination.pictures.map(
      ({ src, description }) => [ src, description ]
    );

    this.view.destinationDetailsView
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
    this.updateDestinationDetailsView();

    return this;
  }

  getFormData() {
    const point = new PointAdapter();
    const destinationName = this.view.destinationSelectView.getValue();
    const [startDate, endDate] = this.view.datePickerView.getDates();

    point.type = this.view.typeSelectView.getValue();
    point.destinationId = this.model.destinations.findBy('name', destinationName)?.id;
    point.startDate = startDate;
    point.endDate = endDate;
    point.basePrice = Number(this.view.priceInputView.getValue());
    point.offerIds = this.view.offerSelectView.getSelectedValues().map(Number);
    point.isFavorite = false;

    return point;
  }

  onTypeSelectChange() {
    const type = this.view.typeSelectView.getValue();
    const typeLabel = TypeLabel[Type.findKey(type)];

    this.view.destinationSelectView.setLabel(typeLabel);
    this.buildOfferSelectView();
  }

  onPointEdit() {
    /** @type {PointView} */
    const linkedPointView = document.querySelector(
      `[data-id="${this.model.activePoint.id}"]`
    );

    this.view.close(true);
    this.updateView();
    this.view
      .link(linkedPointView)
      .open();
  }

  async onViewReset(event) {
    event.preventDefault();

    this.view.setRemovingMode();

    await this.model.points.remove(this.model.activePoint.id);
    this.view.close();

    this.view.unsetRemovingMode();
  }

  async onViewSubmit(event) {
    event.preventDefault();

    try {
      await this.model.points.update(this.model.activePoint.id, this.getFormData());
    } catch (exception) {
      // shake
    }
  }
}
