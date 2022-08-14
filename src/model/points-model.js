import { generatePoint } from '../fish/point.js';
import { getAllTypeOffers } from '../fish/offers.js';
import { getDestinations } from '../fish/destinations.js';

export default class PointsModel {
  points = Array.from({ length: 20 }, generatePoint);
  allTypeOffers = getAllTypeOffers();
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
