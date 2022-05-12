import { minutesToHours, secondsToMinutes } from 'date-fns';

export const formatSeconds = (seconds: number) => {
  const remainderSeconds = seconds % 60;
  const roundedSeconds = seconds - remainderSeconds;
  const minutes = secondsToMinutes(roundedSeconds);
  const hours = minutesToHours(minutes);
  const reminderMinutes = minutes % 60;
  const formattedMinutes =
    reminderMinutes < 10 ? `0${reminderMinutes}` : reminderMinutes;
  const formattedSeconds =
    remainderSeconds < 10 ? `0${remainderSeconds}` : remainderSeconds;

  return `${hours}:${formattedMinutes}:${formattedSeconds}`;
};
