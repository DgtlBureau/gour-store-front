import React from 'react';

import { Box } from 'components/UI/Box/Box';
import { Typography } from 'components/UI/Typography/Typography';

import { Currency } from 'types/entities/Currency';

import { useLocalTranslation } from 'hooks/useLocalTranslation';
import { getCurrencySymbol } from 'utils/currencyUtil';
import { getDeclensionWordByCount } from 'utils/wordUtil';

import { color } from 'themes';

import translations from './Form.i18n.json';

const sx = {
  docket: {
    margin: '40px 0',
  },
  field: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    color: color.muted,
    '&:last-child': {
      marginBottom: '10px',
    },
  },
  label: {
    whiteSpace: 'nowrap',
  },
  value: {
    fontWeight: 700,
    fontFamily: 'Roboto slab',
  },
  discountValue: {
    color: color.error,
  },
  total: {
    color: color.primary,
  },
  divider: {
    width: '100%',
    margin: '0 10px',
    border: '1px dashed rgba(0, 0, 0, 0.2)',
  },
};

type Props = {
  productsCount: number;
  cost: number;
  discount?: number;
  delivery: number;
  currency?: Currency;
};

export function OrderFormDocket({ productsCount, cost, discount = 0, delivery, currency = 'cheeseCoin' }: Props) {
  const { t } = useLocalTranslation(translations);

  const total = cost + delivery;

  const productsDeclision = getDeclensionWordByCount(productsCount, [
    t('manyProducts'),
    t('oneProduct'),
    t('someProducts'),
  ]);

  const currencySymbol = getCurrencySymbol(currency);

  return (
    <Box sx={sx.docket}>
      <Box sx={sx.field}>
        <Typography variant='body1' sx={sx.label}>
          {productsCount} {productsDeclision}
        </Typography>
        <hr style={sx.divider} />
        <Typography variant='h6' sx={sx.value}>
          {cost + discount}
          {currencySymbol}
        </Typography>
      </Box>

      {!!discount && (
        <Box sx={sx.field}>
          <Typography variant='body1' sx={sx.label}>
            {t('discount')}
          </Typography>
          <hr style={sx.divider} />
          <Typography variant='h6' sx={{ ...sx.value, ...sx.discountValue }}>
            -{discount}
            {currencySymbol}
          </Typography>
        </Box>
      )}

      <Box sx={sx.field}>
        <Typography variant='body1' sx={sx.label}>
          {t('delivery')}
        </Typography>
        <hr style={sx.divider} />
        <Typography variant='h6' sx={sx.value}>
          {delivery === 0 ? (
            t('free')
          ) : (
            <>
              {delivery}
              {currencySymbol}
            </>
          )}
        </Typography>
      </Box>

      <Box sx={{ ...sx.field, ...sx.total }}>
        <Typography variant='body1' sx={sx.label}>
          {t('total')}
        </Typography>
        <hr style={sx.divider} />
        <Typography variant='h5' sx={sx.value}>
          {total}
          {currencySymbol}
        </Typography>
      </Box>
    </Box>
  );
}
