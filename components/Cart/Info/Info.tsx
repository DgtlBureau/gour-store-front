import React from 'react';

import { Paper } from '@mui/material';

import { Box } from 'components/UI/Box/Box';
import { Typography } from 'components/UI/Typography/Typography';

import { Currency } from 'types/entities/Currency';

import { useLocalTranslation } from 'hooks/useLocalTranslation';
import { getCurrencySymbol } from 'utils/currencyUtil';
import { getDeclensionWordByCount } from 'utils/wordUtil';

import { color } from 'themes';

import translations from './Info.i18n.json';

const sx = {
  paper: {
    width: '100%',
    padding: '16px',
    boxShadow: 'none',
    '*': {
      display: 'flex',
      justifyContent: 'space-between',
    },
  },

  total: {
    fontWeight: 700,
    color: color.primary,
  },

  footnote: {
    marginTop: '10px',

    color: color.muted,
  },
};

type CartInfoProps = {
  count: number;
  price: number;
  delivery: number;
  discount: number;
  currency?: Currency;
};

export function CartInfo({ count, price, delivery, discount, currency = 'cheeseCoin' }: CartInfoProps) {
  const { t } = useLocalTranslation(translations);

  const productsCountText = getDeclensionWordByCount(count, [t('manyProducts'), t('oneProduct'), t('someProducts')]);

  const currencySymbol = getCurrencySymbol(currency);

  return (
    <Paper sx={sx.paper}>
      <Box sx={sx.total}>
        <Typography variant='h6'>{t('total')}</Typography>
        <Typography variant='h6'>
          {price + delivery}&nbsp;
          {currencySymbol}
        </Typography>
      </Box>
      <Box sx={sx.footnote}>
        <Typography variant='body1'>
          {t('all')}: {count} {productsCountText}
        </Typography>
        <Typography variant='body1'>
          {price + discount}&nbsp;
          {currencySymbol}
        </Typography>
      </Box>
      <Box sx={sx.footnote}>
        <Typography variant='body1'>{t('delivery')}</Typography>
        <Typography variant='body1'>
          {delivery ? (
            <>
              {delivery}&nbsp;{currencySymbol}
            </>
          ) : (
            t('free')
          )}
        </Typography>
      </Box>
      <Box sx={sx.footnote}>
        <Typography variant='body1'>{t('discount')}</Typography>
        <Typography variant='body1' color='error'>
          {discount}&nbsp;
          {currencySymbol}
        </Typography>
      </Box>
    </Paper>
  );
}
