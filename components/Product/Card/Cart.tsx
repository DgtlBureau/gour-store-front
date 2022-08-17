import React from 'react';
import { Grid, IconButton } from '@mui/material';

import CartIcon from '@mui/icons-material/ShoppingCart';
import PlusIcon from '@mui/icons-material/Add';
import MinusIcon from '@mui/icons-material/Remove';
import TrashIcon from '@mui/icons-material/DeleteForever';
import { defaultTheme as t } from '../../../themes';
import { Box } from '../../UI/Box/Box';

const sx = {
  cart: {
    display: 'flex',
    alignItems: 'center',

    marginLeft: 0,

    borderRadius: '99px',

    fontFamily: 'Roboto slab',

    background: t.palette.primary.main,
    color: t.palette.common.white,

    '&: hover': {
      background: t.palette.common.black,
    },
  },
  iconBtn: {
    padding: {
      md: '8px',
      sm: '6px',
      xs: '4px',
    },
  },
  icon: {
    fontSize: {
      md: '22px',
      sm: '20px',
      xs: '18px',
    },
    color: t.palette.common.white,
  },
  deployed: {
    width: '100%',
  },
  action: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
};

type Props = {
  currentCount: number;
  isWeightGood: boolean;
  onAdd: () => void;
  onRemove: () => void;
};

export function ProductCardCart({ onRemove, currentCount, isWeightGood, onAdd }: Props) {
  return (
    <Box sx={{ ...sx.cart, ...(currentCount !== 0 && sx.deployed) }}>
      {currentCount === 0 ? (
        <IconButton sx={sx.iconBtn} onClick={onAdd}>
          <CartIcon sx={sx.icon} />
        </IconButton>
      ) : (
        <Grid container xs>
          <Grid item xs={4} sx={sx.action}>
            <IconButton sx={sx.iconBtn} onClick={onRemove}>
              {currentCount === 1 ? <TrashIcon sx={sx.icon} /> : <MinusIcon sx={sx.icon} />}
            </IconButton>
          </Grid>

          <Grid item xs={4} sx={sx.action}>
            {currentCount} {isWeightGood ? 'кг' : 'шт'}
          </Grid>

          <Grid item xs={4} sx={sx.action}>
            <IconButton sx={sx.iconBtn} onClick={onAdd}>
              <PlusIcon sx={sx.icon} />
            </IconButton>
          </Grid>
        </Grid>
      )}
    </Box>
  );
}
