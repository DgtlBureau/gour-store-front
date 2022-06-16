import React from 'react';

import { Box } from '../UI/Box/Box';
import { Typography } from '../UI/Typography/Typography';
import { getDeclensionWordByCount } from '../../utils/wordHelper';
import { getCurrencySymbol } from '../../helpers/currencyHelper';
import { defaultTheme as theme } from '../../themes';
import { useLocalTranslation } from '../../hooks/useLocalTranslation';
import translations from './Form.i18n.json';
import { Currency } from '../../@types/entities/Currency';

const sx = {
  docket: {
    margin: '40px 0',
  },
  field: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    color: theme.palette.text.muted,
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
    color: theme.palette.error.main,
  },
  total: {
    color: theme.palette.text.secondary,
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

  const total = cost + delivery - discount;

  const productsDeclision = getDeclensionWordByCount(productsCount, [
    t('manyProducts'),
    t('oneProduct'),
    t('someProducts'),
  ]);

  const currencySymbol = getCurrencySymbol(currency);

  return (
    <Box sx={sx.docket}>
      <Box sx={sx.field}>
        <Typography variant="body1" sx={sx.label}>
          {productsCount} {productsDeclision}
        </Typography>
        <hr style={sx.divider} />
        <Typography variant="h6" sx={sx.value}>
          {cost}
          {currencySymbol}
        </Typography>
      </Box>

      {!!discount && (
        <Box sx={sx.field}>
          <Typography variant="body1" sx={sx.label}>
            {t('discount')}
          </Typography>
          <hr style={sx.divider} />
          <Typography variant="h6" sx={{ ...sx.value, ...sx.discountValue }}>
            -{discount}
            {currencySymbol}
          </Typography>
        </Box>
      )}

      <Box sx={sx.field}>
        <Typography variant="body1" sx={sx.label}>
          {t('delivery')}
        </Typography>
        <hr style={sx.divider} />
        <Typography variant="h6" sx={sx.value}>
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
        <Typography variant="body1" sx={sx.label}>
          {t('total')}
        </Typography>
        <hr style={sx.divider} />
        <Typography variant="h5" sx={sx.value}>
          {total}
          {currencySymbol}
        </Typography>
      </Box>
    </Box>
  );
}
