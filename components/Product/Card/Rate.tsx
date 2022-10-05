import React from 'react';

import { SxProps } from '@mui/material';

import { Box } from 'components/UI/Box/Box';
import { Typography } from 'components/UI/Typography/Typography';

import { Currency } from 'types/entities/Currency';

import { useLocalTranslation } from 'hooks/useLocalTranslation';
import { getCurrencySymbol } from 'utils/currencyUtil';

import StarIcon from '@mui/icons-material/Star';
import { defaultTheme } from 'themes';

import translations from '../Actions/Actions.i18n.json';

const rateSx = {
  box: {
    display: 'flex',
    justifyContent: 'space-between',
    color: defaultTheme.palette.text.muted,
  },
  rating: {
    display: 'flex',
    alignItems: 'center',
  },
  star: {
    marginRight: '6px',
  },
  text: {
    fontSize: {
      xs: '12px',
      sm: '13px',
      md: '14px',
    },
  },
};

type Props = {
  rating: number;
  price: number;
  isWeightGood: boolean;
  currency: Currency;
  sx?: SxProps;
};

export function ProductCardRate({ rating, price, isWeightGood, currency, sx }: Props) {
  const { t } = useLocalTranslation(translations);
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
        {getCurrencySymbol(currency)} / {isWeightGood ? t('kg') : t('pcs')}
      </Typography>
    </Box>
  );
}
