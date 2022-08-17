import { Currency } from '../@types/entities/Currency';

export function getCurrencySymbol(currencyAbbreviation: Currency) {
  if (currencyAbbreviation) {
    return <>&#8353;</>;
  }
  return null;
}

export function getPriceWithDiscount(price: number, discount?: number) {
  if (!discount) return price;
  const pricePercent = 1 - discount / 100;
  return Math.round(price * pricePercent);
}
