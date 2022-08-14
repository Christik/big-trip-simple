import { getRandomInteger, getRandomArrayElement } from '../utils.js';

const titles = [
  'Гендерный психоз',
  'Космический мусор',
  'Понимающий автоматизм',
  'Основной закон психофизики',
  'Логарифм раздражителя',
  'Весеннее равноденствие',
  'Гендерный аутотренинг',
  'Гелиоцентрическое расстояние',
  'Сублимированный Юпитер',
  'Философский лимб',
];

const generateOfferTitle = (titleList) => getRandomArrayElement(titleList);

const generateOfferPrice = () => {
  const randomNumber = getRandomInteger(1, 15);

  return randomNumber * 5;
};

const generateOffer = (id) => ({
  id,
  title: generateOfferTitle(titles),
  price: generateOfferPrice(),
});

export { generateOffer };
