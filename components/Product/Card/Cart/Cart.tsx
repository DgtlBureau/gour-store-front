import React from 'react';

import { Grid } from '@mui/material';

import { Box } from 'components/UI/Box/Box';
import { IconButton } from 'components/UI/IconButton/IconButton';
import { Typography } from 'components/UI/Typography/Typography';

import PlusIcon from '@mui/icons-material/Add';
import TrashIcon from '@mui/icons-material/DeleteForever';
import MinusIcon from '@mui/icons-material/Remove';
import CartIcon from '@mui/icons-material/ShoppingCart';

import sx from './Cart.styles';

type Props = {
  isDisabled: boolean;
  amount?: number;
  gram: number;
  onAdd: () => void;
  onRemove: () => void;
};

export function ProductCardCart({ isDisabled, amount = 0, gram, onAdd, onRemove }: Props) {
  return (
    <Box sx={sx.cart}>
      {amount === 0 ? (
        <IconButton sx={sx.iconBtn} disabled={isDisabled} onClick={onAdd}>
          <CartIcon sx={sx.icon} />
          <Typography variant='body2' sx={sx.buyLabel}>
            купить
          </Typography>
        </IconButton>
      ) : (
        <Grid container xs>
          <Grid item xs={4} sx={sx.action}>
            <IconButton sx={sx.iconBtn} onClick={onRemove}>
              {amount === 1 ? <TrashIcon sx={sx.icon} /> : <MinusIcon sx={sx.icon} />}
            </IconButton>
          </Grid>

          <Grid item xs={4} sx={sx.action}>
            {amount * gram} г
          </Grid>

          <Grid item xs={4} sx={sx.action}>
            <IconButton sx={sx.iconBtn} disabled={isDisabled} onClick={onAdd}>
              <PlusIcon sx={sx.icon} />
            </IconButton>
          </Grid>
        </Grid>
      )}
    </Box>
  );
}
