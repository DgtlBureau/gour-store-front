import React from 'react';

import { SxProps } from '@mui/material';

import { Box } from 'components/UI/Box/Box';
import { Typography } from 'components/UI/Typography/Typography';

import { Currency } from 'types/entities/Currency';

import { getCurrencySymbol } from 'utils/currencyUtil';

import StarIcon from '@mui/icons-material/Star';

import rateSx from './Rate.styles';

type ProductCardRateProps = {
  rating: number;
  price: number;
  currency: Currency;
  sx?: SxProps;
};

export function ProductCardRate({ rating, price, currency, sx }: ProductCardRateProps) {
  return (
    <Box sx={{ ...rateSx.box, ...sx }}>
      <Box sx={rateSx.rating}>
        <StarIcon fontSize='small' sx={rateSx.star} />
        <Typography variant='body2' sx={rateSx.text}>
          {rating}
        </Typography>
      </Box>

      <Typography variant='body2' sx={rateSx.text}>
        {price}
        {getCurrencySymbol(currency)} / кг
      </Typography>
    </Box>
  );
}
