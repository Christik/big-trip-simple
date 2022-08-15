import { POINT_TYPES } from '../const.js';
import { capitalizeFirstLetter, getDestinationById, getOffersByType } from '../utils.js';
import dayjs from 'dayjs';

const createEventTypeListTemplate = (selectedType) => {
  let template = '';

  POINT_TYPES.forEach((type) => {
    const isChecked = (type === selectedType) ? 'checked' : '';

    template += /*html*/ `
      <div class="event__type-item">
        <input id="event-type-${type}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${type}" ${isChecked}>
        <label class="event__type-label  event__type-label--${type}" for="event-type-${type}-1">${capitalizeFirstLetter(type)}</label>
      </div>
    `;
  });

  return template;
};

const createEventTypeTemplate = (type) => {
  const eventTypeListTemplate = createEventTypeListTemplate(POINT_TYPES);

  return /*html*/ `
  <div class="event__type-wrapper">
    <label class="event__type  event__type-btn" for="event-type-toggle-1">
      <span class="visually-hidden">Choose event type</span>
      <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">
    </label>
    <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">
    <div class="event__type-list">
      <fieldset class="event__type-group">
        <legend class="visually-hidden">Event type</legend>
        ${eventTypeListTemplate}
      </fieldset>
    </div>
  </div>
`;
};

const createDestinationListTemplate = (destinations) => {
  let template = '<datalist id="destination-list-1">';

  destinations.forEach((destination) => {
    template += `<option value="${destination.name}"></option>`;
  });

  template += '</datalist>';

  return template;
};

const createDestinationSelectTemplate = (selectedType, selectedDestination, allDestinations) => {
  const destinationListTemplate = createDestinationListTemplate(allDestinations);

  return /*html*/ `
    <div class="event__field-group  event__field-group--destination">
      <label class="event__label  event__type-output" for="event-destination-1">
        ${capitalizeFirstLetter(selectedType)}
      </label>
      <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${selectedDestination.name}" list="destination-list-1">
      ${destinationListTemplate}
    </div>
  `;
};

const createDateTemplate = (dateFrom, dateTo) => {
  const humanizeDate = (date) => dayjs(date).format('DD/MM/YY HH:ss');
  const humanizeDateFrom = humanizeDate(dateFrom);
  const humanizeDateTo = humanizeDate(dateTo);

  return /*html*/ `
    <div class="event__field-group  event__field-group--time">
      <label class="visually-hidden" for="event-start-time-1">From</label>
      <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${humanizeDateFrom}">
      &mdash;
      <label class="visually-hidden" for="event-end-time-1">To</label>
      <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${humanizeDateTo}">
    </div>
  `;
};

const createPriceTemplate = (price) => /*html*/ `
  <div class="event__field-group  event__field-group--price">
    <label class="event__label" for="event-price-1">
      <span class="visually-hidden">Price</span>
      &euro;
    </label>
    <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${price}">
  </div>
`;

const createOfferItemTemplate = (offer, isChecked, type) => {
  const isCheckedTemplate = isChecked ? 'checked' : '';

  return /*html*/ `
    <div class="event__offer-selector">
      <input class="event__offer-checkbox  visually-hidden" id="event-offer-${type}-${offer.id}" type="checkbox" name="event-offer-${type}-${offer.id}" ${isCheckedTemplate}>
      <label class="event__offer-label" for="event-offer-${type}-${offer.id}">
        <span class="event__offer-title">${offer.title}</span>
        &plus;&euro;&nbsp;
        <span class="event__offer-price">${offer.price}</span>
      </label>
    </div>
  `;
};

const createOfferListTemplate = (offers, selectedOfferIds, type) => {
  let template = '';

  offers.forEach((offer) => {
    const isChecked = (selectedOfferIds.includes(offer.id));

    template += createOfferItemTemplate(offer, isChecked, type);
  });

  return template;
};

const createOffersContainerTemplate = (allTypeOffers, selectedOfferIds, type) => {
  const offers = getOffersByType(allTypeOffers, type);

  if (offers.length === 0) {
    return '';
  }

  const offerListTemplate = createOfferListTemplate(offers, selectedOfferIds, type);

  return /*html*/ `
    <section class="event__section  event__section--offers">
      <h3 class="event__section-title  event__section-title--offers">Offers</h3>
      <div class="event__available-offers">
        ${offerListTemplate}
      </div>
    </section>
  `;
};

const createDestinationTemplate = (destination) => /*html*/ `
  <section class="event__section  event__section--destination">
    <h3 class="event__section-title  event__section-title--destination">Destination</h3>
    <p class="event__destination-description">${destination.description}</p>
  </section>
`;

const createAdjacentHtmlPointEditor = (point, allTypeOffers, destinations) => {
  const {
    basePrice,
    dateFrom,
    dateTo,
    destination: destinationId,
    offers: offerIds,
    type,
  } = point;

  const destination = getDestinationById(destinations, destinationId);

  const eventTypeTemplate = createEventTypeTemplate(type);
  const destinationsSelectTemplate = createDestinationSelectTemplate(type, destination, destinations);
  const dateTemplate = createDateTemplate(dateFrom, dateTo);
  const priceTemplate = createPriceTemplate(basePrice);
  const offersTemplate = createOffersContainerTemplate(allTypeOffers, offerIds, type);
  const destinationTemplate = createDestinationTemplate(destination);

  return /*html*/ `
    <form class="event event--edit" action="#" method="post">
      <header class="event__header">
        ${eventTypeTemplate}
        ${destinationsSelectTemplate}
        ${dateTemplate}
        ${priceTemplate}
        <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
        <button class="event__reset-btn" type="reset">Delete</button>
        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>
      </header>
      <section class="event__details">
        ${offersTemplate}
        ${destinationTemplate}
      </section>
    </form>
  `;
};

export { createAdjacentHtmlPointEditor };
