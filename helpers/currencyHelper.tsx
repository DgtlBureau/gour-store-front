import { Currency } from '../@types/entities/Currency';

export function getCurrencySymbol(currencyAbbreviation: Currency) {
  switch (currencyAbbreviation) {
      case 'cheeseCoin':
      return <>&#8353;</>;
    default:
      return <></>;
  }
}
