import TripRouteView from '../view/trip-route-view.js';
import TripPointView from '../view/trip-point-view';
import TripNewPointView from '../view/trip-new-point-view';
import TripPointEditorView from '../view/trip-point-editor-view';

export default class RoutePresenter {
  routeElement = new TripRouteView();

  init(containerElement) {
    this.containerElement = containerElement;

    this.routeElement.append(new TripNewPointView());
    this.routeElement.append(new TripPointEditorView());

    for (let i = 0; i < 3; i++) {
      this.routeElement.append(new TripPointView());
    }

    containerElement.append(this.routeElement);
  }
}
