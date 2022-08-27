import FilterPresenter from './presenter/filter-presenter.js';
import RoutePresenter from './presenter/route-presenter.js';
import RouteModel from './model/route-model.js';
import EditorPresenter from './presenter/editor-presenter.js';
import EditorView from './view/editor-view.js';

const routeModel = new RouteModel();
const editorView = new EditorView();

new FilterPresenter(routeModel);
new RoutePresenter(routeModel, editorView);
new EditorPresenter(routeModel, editorView);
