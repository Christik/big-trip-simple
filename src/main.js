import './view/filter-view.js';
import RoutePresenter from './presenter/route-presenter.js';
import RouteModel from './model/route-model.js';
import EditorPresenter from './presenter/editor-presenter.js';
import EditorView from './view/editor-view.js';

const routeModel = new RouteModel();
const editorView = new EditorView();

new RoutePresenter(routeModel, editorView);
new EditorPresenter(routeModel, editorView);
