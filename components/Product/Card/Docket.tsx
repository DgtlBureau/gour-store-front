import React, { useState } from 'react';
import { Menu, MenuItem, IconButton } from '@mui/material';

import { Box } from '../../UI/Box/Box';
import { Typography } from '../../UI/Typography/Typography';
import { defaultTheme as t } from '../../../themes';
import { getCurrencySymbol } from 'helpers/currencyHelper';
import { useLocalTranslation } from 'hooks/useLocalTranslation';
import translation from './Docket.i18n.json';

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
  currency: 'rub' | 'usd' | 'eur';
  discount?: number;
  onEdit: (id: number) => void;
};

export function ProductCardDocket({
  inCart,
  price,
  currency,
  isWeightGood,
  discount = 0,
}: Props) {
  const pricePerCount = isWeightGood ? price / 100 : price;

  const { t } = useLocalTranslation(translation);

  return (
    <Box sx={{ ...sx.docket, ...(inCart && sx.deployed) }}>
      <Box sx={sx.weight}>
        {!!discount && (
          <>
            <Typography variant="body2" sx={sx.oldPrice}>
              {pricePerCount}
            </Typography>
            {!inCart && '/'}
          </>
        )}
        {!inCart && (
          <Typography variant="body2">
            {isWeightGood ? `100${t('gram')}` : t('piece')}
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
