import React, { useState } from 'react';
import { Menu, MenuItem, IconButton } from '@mui/material';

import { Box } from '../../UI/Box/Box';
import { Typography } from '../../UI/Typography/Typography';
import { defaultTheme as t } from '../../../themes';
import { Currency } from '../../../@types/entities/Currency';
import { getCurrencySymbol } from 'helpers/currencyHelper';

const sx = {
  docket: {
    display: 'flex',
    flexDirection: 'column',
  },
  deployed: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    justifyContent: 'flex-end',

    width: '100%',
    marginBottom: '8px',
  },
  weight: {
    display: 'flex',
    color: t.palette.text.muted,
  },
  total: {
    display: 'flex',
    alignItems: 'center',
    marginRight: '5px',
    fontWeight: 'bold',
  },
  price: {
    fontWeight: 'bold',
    fontFamily: ' Roboto slab',
  },
  oldPrice: {
    textDecoration: 'line-through',
  },
  list: {
    ul: {
      backgroundColor: t.palette.background.default,
    },
  },
  listOldPrice: {
    marginLeft: '4px',
    textDecoration: 'line-through',
    color: t.palette.text.muted,
  },
};

type Props = {
  inCart: boolean;
  isWeightGood: boolean;
  price: number;
  discount?: number;
  currency: Currency;
  onEdit: (id: number) => void;
};

export function ProductCardDocket({
  inCart,
  price,
  isWeightGood,
  discount = 0,
  currency,
}: Props) {
  const pricePerCount = isWeightGood ? price / 100 : price;

  return (
    <Box sx={{ ...sx.docket, ...(inCart && sx.deployed) }}>
      <Box sx={sx.weight}>
        {!!discount && (
          <>
            <Typography variant="body2" sx={sx.oldPrice}>
              {pricePerCount}
              {getCurrencySymbol(currency)}
            </Typography>
            {!inCart && '/'}
          </>
        )}
        {!inCart && (
          <Typography variant="body2">
            {isWeightGood ? '100г' : 'шт'}
          </Typography>
        )}
      </Box>

      <Box sx={sx.total}>
        <Typography
          variant={inCart ? 'h6' : 'h5'}
          color={discount ? 'error' : 'primary'}
          sx={sx.price}
        >
          {pricePerCount * (1 - discount / 100)}
          {getCurrencySymbol(currency)}
        </Typography>
      </Box>
    </Box>
  );
}
