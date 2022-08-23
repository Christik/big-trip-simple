import RouteModel from '../model/route-model.js';
import RouteView from '../view/route-view.js';
import RouteEmptyView from '../view/route-empty-view.js';
import SortView from '../view/sort-view.js';
import PointListView from '../view/point-list-view.js';
import PointView from '../view/point-view.js';
import PointEditorView from '../view/point-editor-view.js';
import { capitalizeFirstLetter, formatDate } from '../utils.js';
import {POINT_TYPES} from '../const.js';

export default class RoutePresenter {
  model = new RouteModel();
  pointEditorView = new PointEditorView();
  containerView = null;

  constructor(containerView) {
    this.containerView = containerView;
  }

  /** @param {PointAdapter} point */
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
    /** @type {[string, number][]} */
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
      this.pointEditorView.close();
      this.updatePointEditorView(point);
      this.pointEditorView
        .link(view)
        .open();
    });

    return view;
  }

  /** @param {PointAdapter} point */
  updatePointEditorView(point) {
    const typeTitle = capitalizeFirstLetter(point.type);
    const destination = this.model.getDestinationById(point.destinationId);

    const startDate = formatDate(point.startDate, 'DD/MM/YY');
    const startTime = formatDate(point.startDate, 'HH:mm');
    const startDateTime = `${startDate} ${startTime}`;

    const endDate = formatDate(point.endDate, 'DD/MM/YY');
    const endTime = formatDate(point.endDate, 'HH:mm');
    const endDateTime = `${endDate} ${endTime}`;

    /** @type {[string, PointType, boolean][]} */
    const typeSelectOptions = POINT_TYPES.map((type) => {
      const label = capitalizeFirstLetter(type);
      const isChecked = (type === point.type);

      return [label, type, isChecked];
    });

    /** @type {[string, string][]} */
    const destinationInputOptions = this.model.destinations.map(
      (item) => ['', item.name]
    );

    /** @type {[number, string, number, boolean][]} */
    const offerSelectOptions = this.model
      .getAvailableOffers(point.type)
      .map((offer) => {
        const isChecked = (point.offerIds.includes(offer.id));

        return [offer.id, offer.title, offer.price, isChecked];
      });

    this.pointEditorView.typeSelectView
      .setIcon(point.type)
      .setOptions(typeSelectOptions);

    this.pointEditorView.destinationInputView
      .setLabel(typeTitle)
      .setValue(destination.name)
      .setOptions(destinationInputOptions);

    this.pointEditorView.datePickerView.setStartDate(startDateTime);
    this.pointEditorView.datePickerView.setEndDate(endDateTime);
    this.pointEditorView.priceInputView.setValue(point.basePrice);
    this.pointEditorView.offerSelectView.setOptions(offerSelectOptions);

    this.pointEditorView.destinationDetailsView
      .setDescription(destination.description);

    return this.pointEditorView;
  }

  init() {
    const points = this.model.points;
    const routeView = new RouteView();
    const routeEmptyView = new RouteEmptyView();
    const sortView = new SortView();
    const pointListView = new PointListView();
    const isRouteEmpty = (points.length === 0);

    if (isRouteEmpty) {
      routeView.replaceContent(routeEmptyView);
    } else {
      points.forEach((point) => {
        const pointView = this.createPointView(point);

        pointListView.append(pointView);
      });

      routeView.replaceContent(sortView, pointListView);
    }

    this.containerView.append(routeView);
  }
}
