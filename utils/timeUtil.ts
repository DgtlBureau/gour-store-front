import { differenceInHours, formatDuration, intervalToDuration } from 'date-fns';

export const formatSeconds = (seconds: number) => {
  const duration = intervalToDuration({ start: 0, end: seconds * 1000 });
  const hours = differenceInHours(seconds * 1000, 0);
  const formattedMinutes = (duration.minutes || 0) < 10 ? `0${duration.minutes}` : duration.minutes;
  const formattedSeconds = (duration.seconds || 0) < 10 ? `0${duration.seconds}` : duration.seconds;

  return `${hours}:${formattedMinutes}:${formattedSeconds}`;
};

export const formatTimeLeft = (start: Date, end: Date, locale?: Locale) => {
  const duration = intervalToDuration({ start, end });
  let format: string[];
  if (duration.days) {
    format = ['days', 'hours'];
  } else {
    format = ['hours', 'minutes'];
  }
  const time = formatDuration(duration, { locale, zero: true, format });
  return time;
};
