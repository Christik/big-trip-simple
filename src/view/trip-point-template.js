import {
  capitalizeFirstLetter,
  getOffersByIds,
  getOffersByType,
  getDestinationById } from '../utils.js';
import dayjs from 'dayjs';

const createOffersTemplate = (offers) => /*html*/ `
  <h4 class="visually-hidden">Offers:</h4>
  <ul class="event__selected-offers">
  ${offers.map((offer) => /*html*/ `
    <li class="event__offer">
      <span class="event__offer-title">${offer.title}</span>
      &plus;&euro;&nbsp;
      <span class="event__offer-price">${offer.price}</span>
    </li>
  `).join('')}
  </ul>
`;

const createAdjacentHtmlPoint = (point, allTypeOffers, destinations) => {
  const {
    basePrice,
    dateFrom,
    dateTo,
    destination: destinationId,
    offers: offerIds,
    type,
  } = point;

  const typeInTitleTemplate = capitalizeFirstLetter(type);
  const city = getDestinationById(destinations, destinationId).name;
  const dateFromTemplate = dayjs(dateFrom).format('MMM D');
  const timeFromTemplate = dayjs(dateFrom).format('hh:mm');
  const timeToTemplate = dayjs(dateTo).format('hh:mm');

  const allOffers = getOffersByType(allTypeOffers, type);
  const currentOffers = getOffersByIds(allOffers, offerIds);
  const offersTemplate = createOffersTemplate(currentOffers);

  return /*html*/ `
    <div class="event">
      <time class="event__date" datetime="2019-03-18">${dateFromTemplate}</time>
      <div class="event__type">
        <img class="event__type-icon" width="42" height="42" src="img/icons/${type}.png" alt="Event type icon">
      </div>
      <h3 class="event__title">${typeInTitleTemplate} ${city}</h3>
      <div class="event__schedule">
        <p class="event__time">
          <time class="event__start-time" datetime="${dateFrom}">${timeFromTemplate}</time>
          &mdash;
          <time class="event__end-time" datetime="${dateTo}">${timeToTemplate}</time>
        </p>
      </div>
      <p class="event__price">
        &euro;&nbsp;<span class="event__price-value">${basePrice}</span>
      </p>
      ${offersTemplate}
      <button class="event__rollup-btn" type="button">
        <span class="visually-hidden">Open event</span>
      </button>
    </div>
  `;
};

export { createAdjacentHtmlPoint };
