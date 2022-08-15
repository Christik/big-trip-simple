import TripRouteView from '../view/trip-route-view.js';
import TripPointView from '../view/trip-point-view';
import TripNewPointView from '../view/trip-new-point-view';
import TripPointEditorView from '../view/trip-point-editor-view';

export default class RoutePresenter {
  routeElement = new TripRouteView();

  init(containerElement, pointsModel) {
    this.containerElement = containerElement;
    this.pointsModel = pointsModel;
    this.points = [...this.pointsModel.getPoints()];
    this.offers = [...this.pointsModel.getOffers()];
    this.destinations = [...this.pointsModel.getDestinations()];

    const newPointElement = new TripNewPointView();
    const pointEditorElement = new TripPointEditorView(this.points[0], this.offers, this.destinations);

    this.routeElement.append(newPointElement);
    this.routeElement.append(pointEditorElement);

    for (let i = 0; i < this.points.length; i++) {
      const pointElement = new TripPointView(this.points[i], this.offers, this.destinations);

      this.routeElement.append(pointElement);
    }

    containerElement.append(this.routeElement);
  }
}
