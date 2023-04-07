import React from 'react';

import { SxProps } from '@mui/material';

import { Box } from 'components/UI/Box/Box';
import { Typography } from 'components/UI/Typography/Typography';

import { getCurrencySymbol, getPriceWithDiscount } from 'utils/currencyUtil';

import priceSx from './Price.styles';

type ProductPriceProps = {
  price: number;
  discount?: number;
  withResponsiveFont?: boolean;
  sx?: SxProps;
};

export function ProductPrice({
  price,
  discount = 0,
  withResponsiveFont,
  sx,
}: ProductPriceProps) {
  const priceWithDiscount = getPriceWithDiscount(price, discount);
  const currencySymbol = getCurrencySymbol();

  const oldPriceFontSize = withResponsiveFont
    ? {
        xs: '12px',
        sm: '13px',
        md: '14px',
      }
    : '14px';

  const priceFontSize = withResponsiveFont
    ? {
        xs: '16px',
        sm: '20px',
        md: '24px',
      }
    : '24px';

  return (
    <Box sx={sx}>
      {!!discount && (
        <Typography variant='body2' sx={{ ...priceSx.oldPrice, fontSize: oldPriceFontSize }}>
          {price}&nbsp;
          {currencySymbol}
        </Typography>
      )}

      <Typography
        variant='h6'
        color={discount ? 'error' : 'primary'}
        sx={{ ...priceSx.price, fontSize: priceFontSize }}
      >
        {priceWithDiscount}&nbsp;
        {currencySymbol}
      </Typography>
    </Box>
  );
}
