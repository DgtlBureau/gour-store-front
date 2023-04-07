import { Currency, MonetaryCurrency } from 'types/entities/Currency';

type GeneralCurrency = Currency | MonetaryCurrency;
const symbolByCurrency: Record<GeneralCurrency, JSX.Element> = {
  rub: <>₽</>,
};

export function getCurrencySymbol(currencyAbbreviation: GeneralCurrency = 'rub') {
  return symbolByCurrency.rub;
}

// изначально цена указывается за 1кг
const extraGrams = 50;
export const getPriceByGrams = (price: number, gram: number) => Math.ceil((price / 1000) * (gram + extraGrams));

export function getPriceWithDiscount(price: number, discount?: number) {
  if (!discount) return price;
  const pricePercent = 1 - discount / 100;
  return Math.round(price * pricePercent);
}

const priceFormatter = new Intl.NumberFormat('ru-RU');
export function getFormattedPrice(price: number) {
  return priceFormatter.format(price);
}
