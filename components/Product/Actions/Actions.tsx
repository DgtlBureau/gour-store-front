import React, { CSSProperties } from 'react';
import { Button, ButtonGroup, Stack } from '@mui/material';

import { Typography } from '../../UI/Typography/Typography';
import { IconButton } from '../../UI/IconButton/IconButton';
import { useLocalTranslation } from '../../../hooks/useLocalTranslation';
import translations from './Actions.i18n.json';

import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import RemoveIcon from '@mui/icons-material/Remove';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { getCurrencySymbol } from 'helpers/currencyHelper';

export type ProductActionsProps = {
  price: number;
  discount?: number;
  isWeightGood: boolean;
  currency: 'rub' | 'usd' | 'eur';
  count: number;
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
  count,
  discount,
  currency,
  onAddToCart,
  onRemoveFromCart,
  onAddToFavorite,
  isWeightGood,
}: ProductActionsProps) => {
  const { t } = useLocalTranslation(translations);
  return (
    <Stack sx={containerSx} direction="row" justifyContent="space-between">
      <Stack>
        <Typography variant="body1">
          {discount ? <s>{price}</s> : ''} /100{t('g')}
        </Typography>
        <Typography variant="h5" color={discount ? 'rgba(244, 87, 37, 1)' : ''}>
          {discount ? price * (1 - discount / 100) : price}{' '}
          {getCurrencySymbol(currency)}
        </Typography>
      </Stack>
      <Stack direction="row">
        {count === 0 && (
          <Button onClick={onAddToCart} variant="contained">
            {t('addToCart')}
          </Button>
        )}
        {count !== 0 && (
          <ButtonGroup
            variant="contained"
            aria-label="outlined primary button group"
          >
            <Button onClick={onRemoveFromCart}>
              {/* {count !== 1 ? <RemoveIcon /> : <DeleteIcon />} */}
              <RemoveIcon />
            </Button>
            <Typography sx={{ padding: '0 20px' }} variant="h5">
              {count} {isWeightGood && t('g')}
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
