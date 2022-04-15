import React from 'react';
import { Grid, IconButton } from '@mui/material';

import { Box } from '../../UI/Box/Box';
import { defaultTheme as t } from '../../../themes';

import CartIcon from '@mui/icons-material/ShoppingCart';
import PlusIcon from '@mui/icons-material/Add';
import MinusIcon from '@mui/icons-material/Remove';
import TrashIcon from '@mui/icons-material/DeleteForever';

const sx = {
  box: {
    display: 'flex',
    alignItems: 'center',

    marginLeft: 0,

    borderRadius: '99px',

    background: t.palette.primary.main,
    color: t.palette.common.white,

    '&: hover': {
      background: t.palette.common.black,
    },
  },
  icon: {
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
}

type Weight = {
  value: number; 
  unit: 'г' | 'кг';
}

type Props = {
  inCart: boolean;
  weights:  Weight[];
  weightId: number;
  currentWeight: Weight;
  onAdd: () => void;
  increaseWeight: () => void;
  decreaseWeight: () => void;
}

export function ProductCardCart({
  inCart,
  currentWeight,
  weights,
  weightId,
  onAdd,
  increaseWeight,
  decreaseWeight,
}: Props) {
  return (
    <Box sx={{ ...sx.box, ...(inCart && sx.deployed) }}>
      {
        !inCart ? (
          <IconButton onClick={onAdd}>
            <CartIcon sx={sx.icon} />
          </IconButton>
        ) : (
          <Grid container xs>
            <Grid item xs={4} sx={sx.action}>
              <IconButton onClick={decreaseWeight}>
                {
                  weightId === 0 ? (
                    <TrashIcon sx={sx.icon} /> 
                  ) : (
                    <MinusIcon sx={sx.icon} />
                  )
                }
              </IconButton>
            </Grid>

            <Grid item xs={4} sx={sx.action}>
              {currentWeight.value}
              {currentWeight.unit}
            </Grid>

            <Grid item xs={4} sx={sx.action}>
              {
                weightId + 1 !== weights.length && (
                  <IconButton onClick={increaseWeight}>
                    <PlusIcon sx={sx.icon} />
                  </IconButton>
                )
              }
            </Grid>
          </Grid>
        )
      }
    </Box>
  );
}
