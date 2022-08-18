import FilterView from './view/filter-view.js';
import RoutePresenter from './presenter/route-presenter.js';

const contentContainerView = document.querySelector('.page-main .page-body__container');
const filterContainerView = document.querySelector('.trip-controls__filters');
const routePresenter = new RoutePresenter();

filterContainerView.append(new FilterView());
routePresenter.init(contentContainerView);
