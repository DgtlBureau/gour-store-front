export function getDeclensionWordByCount(count: number, variations: string[]) {
  switch (count % 10) {
    case 1:
      if (count === 11) {
        return variations[0];
      }
      return variations[1];
    case 2:
    case 3:
    case 4:
      if (count === 12 || count === 13) {
        return variations[0];
      }
      return variations[2];
    default:
      return variations[0];
  }
}

type Declensions = [string, string, string];

/** Declensions for numbers in accusative form
 * https://github.com/iamkun/dayjs/blob/dev/src/locale/ru.js#L17-L22
 */
export const ruDeclensions: Record<keyof Duration, Declensions> = {
  seconds: ['секунду', 'секунды', 'секунд'],
  minutes: ['минуту', 'минуты', 'минут'],
  hours: ['час', 'часа', 'часов'],
  days: ['день', 'дня', 'дней'],
  weeks: ['неделю', 'недели', 'недель'],
  months: ['месяц', 'месяца', 'месяцев'],
  years: ['год', 'года', 'лет'],
};

// Cache results to avoid unnecessary calculations
const decCache: number[] = [];

const decCases = [2, 0, 1, 1, 1, 2];

/**
 * Get declension of number
 *
 * Функция помогает получить правильное склонение числительных
 * http://internetbrains.blogspot.com/2010/01/javascript.html
 * Массив легко создавать проверяя числа 1, 3 и 5.
 * @example decOfNum(5, ['секунда', 'секунды', 'секунд']) === 'секунд'
 */
export const decOfNum = (number: number, declensions: Declensions) => {
  if (!decCache[number])
    decCache[number] = number % 100 > 4 && number % 100 < 20 ? 2 : decCases[Math.min(number % 10, 5)];
  return declensions[decCache[number]];
};
