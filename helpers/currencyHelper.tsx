import { Currency } from '../@types/entities/Currency';

export function getCurrencySymbol(currencyAbbreviation: Currency) {
  switch (currencyAbbreviation) {
    case 'rub':
      return <>&#8381;</>;
    case 'eur':
      return <>&#128;</>;
      case 'cheeseCoin':
      return <>&#8353;</>;
    default:
      return <></>;
  }
}
