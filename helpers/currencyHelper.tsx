import { Currency, MonetaryCurrency } from '../types/entities/Currency';

type GeneralCurrency = Currency | MonetaryCurrency;
const symbolByCurrency: Record<GeneralCurrency, JSX.Element> = {
  cheeseCoin: <>&#8353;</>,
  rub: <>₽</>,
};

export function getCurrencySymbol(currencyAbbreviation: GeneralCurrency) {
  return symbolByCurrency[currencyAbbreviation] || null;
}

export function getPriceWithDiscount(price: number, discount?: number) {
  if (!discount) return price;
  const pricePercent = 1 - discount / 100;
  return Math.round(price * pricePercent);
}

const priceFormatter = new Intl.NumberFormat('ru-RU');
export function getFormattedPrice(price: number) {
  return priceFormatter.format(price);
}
