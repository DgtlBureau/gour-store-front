import React from 'react';
import { Paper } from '@mui/material';

import { Box } from '../../UI/Box/Box';
import { Typography } from '../../UI/Typography/Typography';
import { getDeclensionWordByCount } from '../../../utils/wordHelper';
import { defaultTheme as t } from '../../../themes';

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
};

export function CartInfo({ count, weight, price, delivery, discount }: CartInfoProps) {
  const productsCountText = getDeclensionWordByCount(count, [
    'товаров',
    'товар',
    'товара',
  ]);

  return (
    <Paper sx={sx.paper}>
      <Box sx={sx.total}>
        <Typography variant="h6">Итого</Typography>
        <Typography variant="h6">
          {price + delivery - discount}
          ₽
        </Typography>
      </Box>
      <Box sx={sx.footnote}>
        <Typography variant="body1">{`Всего: ${count} ${productsCountText} • ${weight}кг`}</Typography>
        <Typography variant="body1">
          {price}
          ₽
        </Typography>
      </Box>
      <Box sx={sx.footnote}>
        <Typography variant="body1">Доставка</Typography>
        <Typography variant="body1">
          {delivery}
          ₽
        </Typography>
      </Box>
      <Box sx={sx.footnote}>
        <Typography variant="body1">Скидка</Typography>
        <Typography variant="body1" color="error">
          -
          {discount}
          ₽
        </Typography>
      </Box>
    </Paper>
  );
}
