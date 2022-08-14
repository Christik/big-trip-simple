import { getRandomInteger, createCounter } from '../utils.js';
import { generateDestination } from './destination';

const getDestinationId = createCounter();

const generateDestinations = () => {
  const destinations = [];
  const length = getRandomInteger(1, 5);

  for (let i = 0; i < length; i++) {
    const descriptionId = getDestinationId();
    const destination = generateDestination(descriptionId);
    destinations.push(destination);
  }

  return destinations;
};

const allDestinations = generateDestinations();

const getDestinations = () => allDestinations;

export { getDestinations };
