import React from 'react';

import { Grid } from '@mui/material';

import { Box } from 'components/UI/Box/Box';
import { IconButton } from 'components/UI/IconButton/IconButton';
import { Typography } from 'components/UI/Typography/Typography';

import PlusIcon from '@mui/icons-material/Add';
import TrashIcon from '@mui/icons-material/DeleteForever';
import MinusIcon from '@mui/icons-material/Remove';
import CartIcon from '@mui/icons-material/ShoppingCart';
import { defaultTheme as t } from 'themes';

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
    width: '100%',
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
  buyLabel: {
    textTransform: 'uppercase',
    marginLeft: '10px',
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
  // isWeightGood: boolean; // TODO: выпилить это поле
  productGram: number;
  onAdd: () => void;
  onRemove: () => void;
};

export function ProductCardCart({ currentCount, productGram, onAdd, onRemove }: Props) {
  return (
    <Box sx={{ ...sx.cart, ...(currentCount !== -1 && sx.deployed) }}>
      {currentCount === 0 ? (
        <IconButton sx={sx.iconBtn} onClick={onAdd}>
          <CartIcon sx={sx.icon} />
          <Typography variant='body2' sx={sx.buyLabel}>
            купить
          </Typography>
        </IconButton>
      ) : (
        <Grid container xs>
          <Grid item xs={4} sx={sx.action}>
            <IconButton sx={sx.iconBtn} onClick={onRemove}>
              {currentCount === 1 ? <TrashIcon sx={sx.icon} /> : <MinusIcon sx={sx.icon} />}
            </IconButton>
          </Grid>

          <Grid item xs={4} sx={sx.action}>
            {currentCount * productGram} г
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
