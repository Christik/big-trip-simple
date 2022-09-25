import dayjs from 'dayjs';

export const formatDate = (date) => dayjs(date).format('MMM D');

export const formatTime = (date) => dayjs(date).format('HH:mm');

export const formatNumber = (value, locale = 'en') => value.toLocaleString(locale);
