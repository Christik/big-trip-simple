import RouteView from '../view/route-view.js';
import { createPointEditorElement } from './point-editor-element.js';
import { createPointElement } from './point-element.js';
import PointsModel from '../model/points-model.js';

/**
 * Презентер для маршрута со списком точек остановки
 */
export default class RoutePresenter {
  /**
   * Отрисовывает все точки маршрута
   * @param {HTMLElement} containerElement
   */
  init(containerElement) {
    const pointsModel = new PointsModel();
    const points = pointsModel.get();
    const routeElement = new RouteView();
    const pointEditorElement = createPointEditorElement(points[0]);
    const fragment = document.createDocumentFragment();

    fragment.append(pointEditorElement);

    points.forEach((point) => {
      const pointElement = createPointElement(point);

      fragment.append(pointElement);
    });

    routeElement.append(fragment);
    containerElement.append(routeElement);
  }
}
