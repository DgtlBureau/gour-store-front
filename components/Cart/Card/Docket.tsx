import React from 'react';

import { getCurrencySymbol, getPriceWithDiscount } from 'helpers/currencyHelper';
import { Box } from 'components/UI/Box/Box';
import { Typography } from 'components/UI/Typography/Typography';
import { Currency } from 'types/entities/Currency';

import sx from './Card.styles';

type Props = {
  currency: Currency;
  discount?: number;
  price: number;
  amount: number;
};

export function CartCardDocket({ currency, discount, price, amount }: Props) {
  const currencySymbol = getCurrencySymbol(currency);

  const totalPrice = getPriceWithDiscount(price, discount);

  return (
    <Box sx={sx.docket}>
      <Typography variant='h5' sx={sx.price} color={discount ? 'error' : 'primary'}>
        {totalPrice * amount} {currencySymbol}
      </Typography>

      {!!discount && (
        <Typography variant='body2' sx={sx.oldPrice}>
          {price * amount} {currencySymbol}
        </Typography>
      )}
    </Box>
  );
}
