import React from 'react';

import { Box } from '../../UI/Box/Box';
import { Typography } from '../../UI/Typography/Typography';
import { defaultTheme as t } from '../../../themes';

import StarIcon from '@mui/icons-material/Star';
import { getCurrencySymbol } from 'helpers/currencyHelper';
import { useLocalTranslation } from 'hooks/useLocalTranslation';
import translation from './Rate.i18n.json';
const sx = {
  box: {
    display: 'flex',
    justifyContent: 'space-between',
    color: t.palette.text.muted,
  },
  rating: {
    display: 'flex',
    alignItems: 'center',
  },
  star: {
    marginRight: '6px',
  },
};

type Props = {
  rating: number;
  price: number;
  isWeightGood: boolean;
  currency: 'rub' | 'usd' | 'eur';
};

export function ProductCardRate({
  rating,
  price,
  currency,
  isWeightGood,
}: Props) {
  const { t } = useLocalTranslation(translation);
  return (
    <Box sx={sx.box}>
      <Box sx={sx.rating}>
        <StarIcon fontSize="small" sx={sx.star} />
        <Typography variant="body2">{rating}</Typography>
      </Box>

      <Typography variant="body2">
        {price}
        {getCurrencySymbol(currency)}/{isWeightGood ? t('kilo') : t('piece')}
      </Typography>
    </Box>
  );
}
