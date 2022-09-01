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
   * @param {PointType} type
   */
  updateTypeSelectView(type) {
    /** @type {[string, PointType, boolean][]} */
    const typeSelectOptions = Object.values(Type).map((value) => {
      const key = Type.findKey(value);
      const label = TypeLabel[key];
      const isChecked = (value === type);

      return [label, value, isChecked];
    });

    this.view.typeSelectView
      .setIcon(type)
      .setOptions(typeSelectOptions);
  }

  /**
   * @param {PointType} type
   * @param {number} destinationId
   */
  updateDestinationSelectView(type, destinationId) {
    const typeTitle = TypeLabel[Type.findKey(type)];
    const destination = this.model.getDestinationById(destinationId);

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
   * @param {string} startDate
   * @param {string} endDate
   */
  updateDatePickerView(startDate, endDate) {
    const startDateFormatted = formatDate(startDate, this.dateFormat);
    const startTimeFormatted = formatDate(startDate, this.timeFormat);
    const startDateTime = `${startDateFormatted} ${startTimeFormatted}`;

    const endDateFormatted = formatDate(endDate, this.dateFormat);
    const endTimeFormatted = formatDate(endDate, this.timeFormat);
    const endDateTime = `${endDateFormatted} ${endTimeFormatted}`;

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
   * @param {number} destinationId
   */
  updateDestinationDetailsView(destinationId) {
    const destination = this.model.getDestinationById(destinationId);

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
    this.updateTypeSelectView(point.type);
    this.updateDestinationSelectView(point.type, point.destinationId);
    this.updateDatePickerView(point.startDate, point.endDate);
    this.view.priceInputView.setValue(point.basePrice);
    this.updateOfferSelectView(point);
    this.updateDestinationDetailsView(point.destinationId);

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

  onDestinationChange(event) {
    const destinationSelectView = event.target;
    const destinationName = destinationSelectView.getValue();
    const destination = this.model.getDestinationByName(destinationName);

    this.updateDestinationDetailsView(destination.id);
  }
}
