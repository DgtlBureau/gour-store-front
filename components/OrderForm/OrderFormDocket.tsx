import React from 'react';

import { Box } from '../UI/Box/Box';
import { Typography } from '../UI/Typography/Typography';
import { getDeclensionWordByCount } from '../../utils/wordHelper';
import { defaultTheme as t } from '../../themes';

const sx = {
  docket: {
    margin: '40px 0',
  },
  field: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '10px',
    color: t.palette.text.muted,
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
    color: t.palette.error.main,
  },
  total: {
    color: t.palette.text.secondary,
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
}

export function OrderFormDocket({
  productsCount,
  cost,
  discount = 0,
  delivery,
}: Props) {
  const total = cost + delivery - discount;
  const productsDeclision = getDeclensionWordByCount(productsCount, [
    'товаров',
    'товар',
    'товара',
  ]);

  return (
    <Box sx={sx.docket}>
      <Box sx={sx.field}>
        <Typography variant="body1" sx={sx.label}>
          {productsCount}
          {' '}
          {productsDeclision}
        </Typography>
        <hr style={sx.divider} />
        <Typography variant="h6" sx={sx.value}>
          {cost}
          ₽
        </Typography>
      </Box>

      {
        !!discount && (
          <Box sx={sx.field}>
            <Typography variant="body1" sx={sx.label}>Скидка</Typography>
            <hr style={sx.divider} />
            <Typography variant="h6" sx={{ ...sx.value, ...sx.discountValue }}>
              -
              {discount}
              ₽
            </Typography>
          </Box>
        )
      }

      <Box sx={sx.field}>
        <Typography variant="body1" sx={sx.label}>Доставка</Typography>
        <hr style={sx.divider} />
        <Typography variant="h6" sx={sx.value}>
          {delivery}
          ₽
        </Typography>
      </Box>

      <Box sx={{ ...sx.field, ...sx.total }}>
        <Typography variant="body1" sx={sx.label}>Итого</Typography>
        <hr style={sx.divider} />
        <Typography variant="h5" sx={sx.value}>
          {total}
          ₽
        </Typography>
      </Box>
    </Box>
  );
}
