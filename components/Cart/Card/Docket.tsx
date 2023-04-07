import React from 'react';

import { Box } from 'components/UI/Box/Box';
import { Typography } from 'components/UI/Typography/Typography';


import { getCurrencySymbol, getPriceWithDiscount } from 'utils/currencyUtil';

import sx from './Card.styles';

type Props = {
  discount?: number;
  price: number;
  amount: number;
};

export function CartCardDocket({ discount, price, amount }: Props) {
  const currencySymbol = getCurrencySymbol();

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
