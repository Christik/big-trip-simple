import RouteModel from '../model/route-model.js';
import RouteView from '../view/route-view.js';
import PointView from '../view/point-view.js';
import PointEditorView from '../view/point-editor-view.js';
import { capitalizeFirstLetter, formatDate } from '../utils.js';
import {POINT_TYPES} from '../const.js';

export default class RoutePresenter {
  constructor() {
    this.model = new RouteModel();
    this.editorView = new PointEditorView();

    /**
     * @type {RouteView}
     */
    this.view = document.querySelector(String(RouteView));
  }

  /**
   * @param {PointAdapter} point
   */
  createPointView(point) {
    const view = new PointView();
    const destination = this.model.getDestinationById(point.destinationId);
    const title = `${point.type} ${destination.name}`;
    const price = String(point.basePrice);

    const dateForHuman = formatDate(point.startDate, 'MMM D');
    const dateForMachine = formatDate(point.startDate, 'YYYY-MM-DD');
    const startTimeForHuman = formatDate(point.startDate, 'HH:mm');

    const startTimeForMachine = formatDate(point.startDate, 'YYYY-MM-[DD]T[HH]:mm');
    const endTimeForHuman = formatDate(point.endDate, 'HH:mm');
    const endTimeForMachine = formatDate(point.endDate, 'YYYY-MM-[DD]T[HH]:mm');

    const offers = this.model.getOffers(point.type, point.offerIds);

    /**
     * @type {[string, number][]}
     */
    const offersOptions = offers.map((offer) => [offer.title, offer.price]);

    view
      .setTitle(title)
      .setIcon(point.type)
      .setDate(dateForHuman, dateForMachine)
      .setStartTime(startTimeForHuman, startTimeForMachine)
      .setEndTime(endTimeForHuman, endTimeForMachine)
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
    const typeTitle = capitalizeFirstLetter(point.type);
    const destination = this.model.getDestinationById(point.destinationId);

    const startDate = formatDate(point.startDate, 'DD/MM/YY');
    const startTime = formatDate(point.startDate, 'HH:mm');
    const startDateTime = `${startDate} ${startTime}`;

    const endDate = formatDate(point.endDate, 'DD/MM/YY');
    const endTime = formatDate(point.endDate, 'HH:mm');
    const endDateTime = `${endDate} ${endTime}`;

    /**
     * @type {[string, PointType, boolean][]}
     */
    const typeSelectOptions = POINT_TYPES.map((type) => {
      const label = capitalizeFirstLetter(type);
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
    const offerSelectOptions = this.model
      .getAvailableOffers(point.type)
      .map((offer) => {
        const isChecked = (point.offerIds.includes(offer.id));

        return [offer.id, offer.title, offer.price, isChecked];
      });

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
      .setDescription(destination.description);

    return this.editorView;
  }

  async init() {
    await this.model.ready();

    const points = this.model.getPoints();
    const isRouteEmpty = (points.length === 0);

    if (isRouteEmpty) {
      this.view.showPlaceholder('Click New Event to create your first point');

      return;
    }

    /**
     * @type {PointView[]}
     */
    const pointViews = points.map((point) => this.createPointView(point));

    this.view
      .hidePlaceholder()
      .setPoints(...pointViews);
  }
}
