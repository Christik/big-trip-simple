/** @typedef {import('../model/route-model').default} RouteModel */
/** @typedef {import('../view/editor-view').default} EditorView */

import RouteView from '../view/route-view.js';
import PointView from '../view/point-view.js';
import Type from '../enum/type.js';
import TypeLabel from '../enum/type-label.js';
import { formatDate, getOfferSelectOptions } from '../utils.js';

export default class RoutePresenter {
  /**
   * @param {RouteModel} model
   * @param {EditorView} model
   */
  constructor(model, editorView) {
    this.model = model;

    /**
     * @type {RouteView}
     */
    this.view = document.querySelector(String(RouteView));
    this.editorView = editorView;

    this.model.ready().then(() => {
      const points = this.model.getPoints();
      const pointViews = points.map((point) => this.createPointView(point));
      const isRouteEmpty = (points.length === 0);

      if (isRouteEmpty) {
        this.view.showPlaceholder('Click New Event to create your first point');

        return;
      }

      this.view
        .hidePlaceholder()
        .setPoints(...pointViews);
    });
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
  createPointView(point) {
    const view = new PointView();
    const destination = this.model.getDestinationById(point.destinationId);
    const title = `${point.type} ${destination.name}`;
    const price = String(point.basePrice);
    const dateForHuman = formatDate(point.startDate, this.shortDateFormat);
    const startTimeForHuman = formatDate(point.startDate, this.timeFormat);
    const endTimeForHuman = formatDate(point.endDate, this.timeFormat);
    const offers = this.model.getOffers(point.type, point.offerIds);

    /**
     * @type {[string, number][]}
     */
    const offersOptions = offers.map((offer) => [offer.title, offer.price]);

    view
      .setTitle(title)
      .setIcon(point.type)
      .setDate(dateForHuman, point.startDate)
      .setStartTime(startTimeForHuman, point.startDate)
      .setEndTime(endTimeForHuman, point.endDate)
      .setPrice(price);

    view.pointOffersView.setOptions(offersOptions);

    view.addEventListener('expand', () => {
      this.editorView.close();
      this.updatePointEditorView(point);
      this.editorView
        .link(view)
        .open();
    });

    return view;
  }

  /**
   * @param {PointAdapter} point
   */
  updatePointEditorView(point) {
    const typeTitle = TypeLabel[Type.findKey(point.type)];
    const destination = this.model.getDestinationById(point.destinationId);

    const startDate = formatDate(point.startDate, this.dateFormat);
    const startTime = formatDate(point.startDate, this.timeFormat);
    const startDateTime = `${startDate} ${startTime}`;

    const endDate = formatDate(point.endDate, this.dateFormat);
    const endTime = formatDate(point.endDate, this.timeFormat);
    const endDateTime = `${endDate} ${endTime}`;

    /**
     * @type {[string, PointType, boolean][]}
     */
    const typeSelectOptions = Object.values(Type).map((type) => {
      const key = Type.findKey(type);
      const label = TypeLabel[key];
      const isChecked = (type === point.type);

      return [label, type, isChecked];
    });

    /**
     * @type {[string, string][]}
     */
    const destinationInputOptions = this.model.getDestinations().map(
      (item) => ['', item.name]
    );

    /**
     * @type {[number, string, number, boolean][]}
     */
    const offerSelectOptions = getOfferSelectOptions(
      this.model.getAvailableOffers(point.type),
      point.offerIds
    );

    /**
     * @type {[string, string][]}
     */
    const pictureOptions = destination.pictures.map(
      ({ src, description }) => [ src, description ]
    );

    const {
      typeSelectView,
      destinationInputView,
      datePickerView,
      priceInputView,
      offerSelectView,
      destinationDetailsView
    } = this.editorView;

    typeSelectView
      .setIcon(point.type)
      .setOptions(typeSelectOptions);

    destinationInputView
      .setLabel(typeTitle)
      .setValue(destination.name)
      .setOptions(destinationInputOptions);

    datePickerView
      .setStartDate(startDateTime)
      .setEndDate(endDateTime);

    priceInputView.setValue(point.basePrice);
    offerSelectView.setOptions(offerSelectOptions);

    destinationDetailsView
      .setDescription(destination.description)
      .setPictures(pictureOptions);

    return this.editorView;
  }
}
