import { differenceInHours, formatDuration, getDefaultOptions, intervalToDuration } from 'date-fns';

import { decOfNum, ruDeclensions } from './wordUtil';

export const formatSeconds = (seconds: number) => {
  const duration = intervalToDuration({ start: 0, end: seconds * 1000 });
  const hours = differenceInHours(seconds * 1000, 0);
  const formattedMinutes = (duration.minutes || 0) < 10 ? `0${duration.minutes}` : duration.minutes;
  const formattedSeconds = (duration.seconds || 0) < 10 ? `0${duration.seconds}` : duration.seconds;

  return `${hours}:${formattedMinutes}:${formattedSeconds}`;
};

const getFormatDuration = (duration: Duration): Array<keyof Duration> => {
  if (duration.days) {
    return ['days', 'hours'];
  }
  if (duration.hours) {
    return ['hours', 'minutes'];
  }
  return ['minutes', 'seconds'];
};

export const formatTimeLeft = (start: Date, end: Date, locale?: Locale) => {
  const duration = intervalToDuration({ start, end });
  const format = getFormatDuration(duration);

  const defaultOptions = getDefaultOptions() as { locale?: Locale };
  const lang = locale?.code ?? defaultOptions.locale?.code ?? 'ru';

  if (lang === 'ru') {
    return format.reduce((acc, unit) => {
      if (!duration[unit]) return acc;
      const timePostfix = decOfNum(duration[unit] ?? 0, ruDeclensions[unit]);
      return `${acc} ${duration[unit]} ${timePostfix}`;
    }, '');
  }

  const time = formatDuration(duration, { locale, zero: true, format });
  return time;
};
