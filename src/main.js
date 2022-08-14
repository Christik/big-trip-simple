import TripFilterView from './view/trip-filter-view.js';
import TripSortView from './view/trip-sort-view.js';
import RoutePresenter from './presenter/route-presenter.js';

const contentContainerElement = document.querySelector('.trip-events');
const filterContainerElement = document.querySelector('.trip-controls__filters');
const routePresenter = new RoutePresenter();

filterContainerElement.append(new TripFilterView());
contentContainerElement.append(new TripSortView());
routePresenter.init(contentContainerElement);
