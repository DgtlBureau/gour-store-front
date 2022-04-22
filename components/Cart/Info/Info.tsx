import React from 'react';
import { Paper } from '@mui/material';

import { Box } from '../../UI/Box/Box';
import { Typography } from '../../UI/Typography/Typography';
import { getDeclensionWordByCount } from '../../../utils/wordHelper';
import { defaultTheme as t } from '../../../themes';
import { getCurrencySymbol } from '../../../helpers/currencyHelper';
import { useLocalTranslation } from '../../../hooks/useLocalTranslation';
import translations from './Info.i18n.json';

const sx = {
  paper: {
    maxWidth: '380px',
    padding: '16px',

    '*': {
      display: 'flex',
      justifyContent: 'space-between',
    },
  },

  total: {
    fontWeight: 700,
    color: t.palette.text.secondary,
  },

  footnote: {
    marginTop: '10px',

    color: t.palette.text.muted,
  },
};

type CartInfoProps = {
  count: number;
  weight: number;
  price: number;
  delivery: number;
  discount: number;
  currency?: 'rub' | 'usd' | 'eur';
};

export function CartInfo({
  count,
  weight,
  price,
  delivery,
  discount,
  currency = 'rub',
}: CartInfoProps) {
  const { t } = useLocalTranslation(translations);

  const productsCountText = getDeclensionWordByCount(count, [
    t('manyProducts'),
    t('oneProduct'),
    t('someProducts'),
  ]);

  const currencySymbol = getCurrencySymbol(currency);

  return (
    <Paper sx={sx.paper}>
      <Box sx={sx.total}>
        <Typography variant="h6">{t('total')}</Typography>
        <Typography variant="h6">
          {price + delivery - discount}
          {currencySymbol}
        </Typography>
      </Box>
      <Box sx={sx.footnote}>
        <Typography variant="body1">{`${t('all')}: ${count} ${productsCountText} • ${weight}${t('kg')}`}</Typography>
        <Typography variant="body1">
          {price}
          {currencySymbol}
        </Typography>
      </Box>
      <Box sx={sx.footnote}>
        <Typography variant="body1">{t('delivery')}</Typography>
        <Typography variant="body1">
          {delivery}
          {currencySymbol}
        </Typography>
      </Box>
      <Box sx={sx.footnote}>
        <Typography variant="body1">{t('discount')}</Typography>
        <Typography variant="body1" color="error">
          -
          {discount}
          {currencySymbol}
        </Typography>
      </Box>
    </Paper>
  );
}
