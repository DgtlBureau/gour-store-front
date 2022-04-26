import React, { CSSProperties } from 'react';
import { Button, ButtonGroup, Stack } from '@mui/material';
import { Typography } from '../../UI/Typography/Typography';
import { IconButton } from '../../UI/IconButton/IconButton';

import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import RemoveIcon from '@mui/icons-material/Remove';
import FavoriteIcon from '@mui/icons-material/Favorite';

export type ProductActionsProps = {
  price: number;
  discount?: number;
  weight: number;
  onAddToCart: () => void;
  onRemoveFromCart: () => void;
  onAddToFavorite: () => void;
};

const containerSx: CSSProperties = {
  margin: '50px 0 0 0',
  width: '100%',
};

export const ProductActions = ({
  price,
  weight,
  discount,
  onAddToCart,
  onRemoveFromCart,
  onAddToFavorite,
}: ProductActionsProps) => {
  return (
    <Stack sx={containerSx} direction="row" justifyContent="space-between">
      <Stack>
        <Typography variant="body1">
          {discount ? <s>{price}</s> : ''} /100г
        </Typography>
        <Typography variant="h5" color={discount ? 'rgba(244, 87, 37, 1)' : ''}>
          {discount ? price * (1 - discount / 100) : price}
        </Typography>
      </Stack>
      <Stack direction="row">
        {weight === 0 && (
          <Button onClick={onAddToCart} variant="contained">
            В корзину
          </Button>
        )}
        {weight !== 0 && (
          <ButtonGroup
            variant="contained"
            aria-label="outlined primary button group"
          >
            <Button onClick={onRemoveFromCart}>
              {weight !== 1 ? <RemoveIcon /> : <DeleteIcon />}
            </Button>
            <Typography sx={{ padding: '0 20px' }} variant="h5">
              {weight} г
            </Typography>
            <Button onClick={onAddToCart}>
              <AddIcon />
            </Button>
          </ButtonGroup>
        )}
        <IconButton onClick={onAddToFavorite} component={'symbol'}>
          <FavoriteIcon />
        </IconButton>
      </Stack>
    </Stack>
  );
};
