import { generatePoint } from '../fish/point.js';
import OffersModel from './offers-model.js';
import DestinationsModel from './destinations-model.js';
import { getOffersByType, getOffersByIds, getDestinationById } from '../utils.js';

export default class PointsModel {
  get() {
    const points = Array.from({length: 20}, generatePoint);
    const offersModel = new OffersModel();
    const offerGroups = offersModel.get();
    const destinationsModel = new DestinationsModel();
    const destinations = destinationsModel.get();

    return points.map((point) => {
      const aggregatePoint = {
        basePrice: point.base_price,
        dateFrom: point.date_from,
        dateTo: point.date_to,
        id: point.id,
        type: point.type,
      };
      const offersOfType = getOffersByType(offerGroups, point.type);
      const pointOffers = getOffersByIds(offersOfType, point.offers);
      const destination = getDestinationById(destinations, point.destination);

      aggregatePoint.offers = pointOffers;
      aggregatePoint.destination = destination;

      return aggregatePoint;
    });
  }
}
