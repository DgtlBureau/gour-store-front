export function getCurrencySymbol(currencyAbbreviation: 'rub' | 'usd' | 'eur') {
  switch (currencyAbbreviation) {
    case 'rub':
      return <>&#8381;</>;
    case 'usd':
      return <>&#36;</>;
    case 'eur':
      return <>&#128;</>;
    default:
      return <></>;
  }
}
