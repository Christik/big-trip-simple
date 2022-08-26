import './view/filter-view.js';
import RoutePresenter from './presenter/route-presenter.js';
import RouteModel from './model/route-model.js';

const routeModel = new RouteModel();

new RoutePresenter(routeModel);
