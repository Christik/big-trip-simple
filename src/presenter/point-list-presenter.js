import DateFormat from '../enum/date-format.js';
import Presenter from './presenter.js';
import { formatDate } from '../utils.js';

/**
 * @template {ApplicationModel} Model
 * @template {PointListView} View
 * @extends Presenter<Model,View>
 */
export default class PointListPresenter extends Presenter {
  /**
   * @param {[model: Model, view: View]} args
   */
  constructor(...args) {
    super(...args);

    this.updateView();
  }

  updateView() {
    const points = this.model.points.list();

    const states = points.map((point) => {
      const {startDate, endDate} = point;
      const destination = this.model.destinations.findById(point.destinationId);
      const offerGroup = this.model.offerGroups.findById(point.type);

      const offerStates = offerGroup.items.reduce((result, offer) => {
        if (point.offerIds.includes(offer.id)) {
          result.push([offer.title, offer.price]);
        }
        return result;
      }, []);

      return {
        id: point.id,
        startIsoDate: startDate,
        endIsoDate: endDate,
        title: destination.name,
        icon: point.type,
        startDate: formatDate(startDate, DateFormat.CALENDAR_DATE),
        startTime: formatDate(startDate, DateFormat.TIME),
        endTime: formatDate(endDate, DateFormat.TIME),
        price: String(point.basePrice),
        offers: offerStates
      };
    });

    this.view.setItems(states);
  }
}
