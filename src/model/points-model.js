import { generatePoint } from '../fish/point.js';
import { getOfferGroups } from '../fish/offerGroups.js';
import { getDestinations } from '../fish/destinations.js';

export default class PointsModel {
  points = Array.from({ length: 20 }, generatePoint);
  allTypeOffers = getOfferGroups();
  destinations = getDestinations();

  getPoints() {
    return this.points;
  }

  getOffers() {
    return this.allTypeOffers;
  }

  getDestinations() {
    return this.destinations;
  }
}
