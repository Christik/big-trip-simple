import { generatePoint } from '../fish/point.js';
import { getOfferGroups } from '../fish/offerGroups.js';
import { getDestinations } from '../fish/destinations.js';
import { getOffersByType, getOffersByIds, getDestinationById } from '../utils.js';

export default class RouteModel {
  get() {
    const points = Array.from({length: 20}, generatePoint);
    const offerGroups = getOfferGroups();
    const destinations = getDestinations();
    const aggregatePoints = points.map((point) => {
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

    return aggregatePoints;
  }
}
