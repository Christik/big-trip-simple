/** @typedef {import('../model/route-model').default} RouteModel */
/** @typedef {import('../adapter/point-adapter').default} PointAdapter */

import EditorView from '../view/editor-view.js';
import Type from '../enum/type.js';
import TypeLabel from '../enum/type-label.js';
import { getOfferSelectOptions, formatDate } from '../utils.js';

export default class EditorPresenter {
  /**
   * @param {RouteModel} model
   */
  constructor(model) {
    this.model = model;
    this.view = new EditorView();

    document.addEventListener('point-edit', this.onPointEdit.bind(this));
    this.view.addEventListener('type-change', this.onTypeChange.bind(this), true);
    this.view.addEventListener('destination-change', this.onDestinationChange.bind(this), true);
  }

  get dateFormat() {
    return 'DD/MM/YY';
  }

  get shortDateFormat() {
    return 'MMM D';
  }

  get timeFormat() {
    return 'HH:mm';
  }

  /**
   * @param {PointAdapter} point
   */
  updateTypeSelectView(point) {
    /** @type {[string, PointType, boolean][]} */
    const typeSelectOptions = Object.values(Type).map((type) => {
      const key = Type.findKey(type);
      const label = TypeLabel[key];
      const isChecked = (type === point.type);

      return [label, type, isChecked];
    });

    this.view.typeSelectView
      .setIcon(point.type)
      .setOptions(typeSelectOptions);
  }

  /**
   * @param {PointAdapter} point
   */
  updateDestinationInputView(point) {
    const typeTitle = TypeLabel[Type.findKey(point.type)];
    const destination = this.model.getDestinationById(point.destinationId);

    /** @type {[string, string][]} */
    const destinationInputOptions = this.model.getDestinations().map(
      (item) => ['', item.name]
    );

    this.view.destinationInputView
      .setLabel(typeTitle)
      .setValue(destination.name)
      .setOptions(destinationInputOptions);
  }

  /**
   * @param {PointAdapter} point
   */
  updateDatePickerView(point) {
    const startDate = formatDate(point.startDate, this.dateFormat);
    const startTime = formatDate(point.startDate, this.timeFormat);
    const startDateTime = `${startDate} ${startTime}`;

    const endDate = formatDate(point.endDate, this.dateFormat);
    const endTime = formatDate(point.endDate, this.timeFormat);
    const endDateTime = `${endDate} ${endTime}`;

    this.view.datePickerView
      .setStartDate(startDateTime)
      .setEndDate(endDateTime);
  }

  /**
   * @param {PointAdapter} point
   */
  updateOfferSelectView(point) {
    /** @type {[number, string, number, boolean][]} */
    const offerSelectOptions = getOfferSelectOptions(
      this.model.getAvailableOffers(point.type),
      point.offerIds
    );

    this.view.offerSelectView.setOptions(offerSelectOptions);
  }

  /**
   * @param {PointAdapter} point
   */
  updateDestinationDetailsView(point) {
    const destination = this.model.getDestinationById(point.destinationId);

    /** @type {[string, string][]} */
    const pictureOptions = destination.pictures.map(
      ({ src, description }) => [ src, description ]
    );

    this.view.destinationDetailsView
      .setDescription(destination.description)
      .setPictures(pictureOptions);
  }

  /**
   * @param {PointAdapter} point
   */
  updateView(point) {
    this.updateTypeSelectView(point);
    this.updateDestinationInputView(point);
    this.updateDatePickerView(point);
    this.view.priceInputView.setValue(point.basePrice);
    this.updateOfferSelectView(point);
    this.updateDestinationDetailsView(point);

    return this.view;
  }

  onPointEdit(event) {
    const point = this.model.getPointById(event.detail);

    this.view.close();
    this.updateView(point);
    this.view
      .link(event.target)
      .open();
  }

  onTypeChange(event) {
    const type = event.detail;
    const typeLabel = TypeLabel[Type.findKey(type)];
    const offerSelectOptions = getOfferSelectOptions(
      this.model.getAvailableOffers(type)
    );

    this.view.destinationInputView.setLabel(typeLabel);
    this.view.offerSelectView.setOptions(offerSelectOptions);
  }

  onDestinationChange() {
    // console.log(event);
  }
}
