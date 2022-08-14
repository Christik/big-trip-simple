import TripFilterView from './view/trip-filter-view.js';
import TripSortView from './view/trip-sort-view.js';
import RoutePresenter from './presenter/route-presenter.js';
import PointsModel from './model/points-model.js';

const contentContainerElement = document.querySelector('.trip-events');
const filterContainerElement = document.querySelector('.trip-controls__filters');
const routePresenter = new RoutePresenter();
const pointsModel = new PointsModel();

filterContainerElement.append(new TripFilterView());
contentContainerElement.append(new TripSortView());
routePresenter.init(contentContainerElement, pointsModel);
