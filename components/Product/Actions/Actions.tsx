import React from 'react';
import { Button, Stack, SxProps } from '@mui/material';

import { Typography } from '../../UI/Typography/Typography';
import { IconButton } from '../../UI/IconButton/IconButton';
import { useLocalTranslation } from '../../../hooks/useLocalTranslation';
import translations from './Actions.i18n.json';

import AddIcon from '@mui/icons-material/Add';

import RemoveIcon from '@mui/icons-material/Remove';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { defaultTheme as theme } from '../../../themes';

import { getCurrencySymbol } from '../../../helpers/currencyHelper';

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

const sx: Record<string, SxProps> = {
  container: {
    margin: '50px 0 0 0',
    width: '350px',
  },
  buttonGroup: {
    padding: '0 24px',
    height: '40px',
    borderRadius: '99px',
    background: theme.palette.primary.main,
    color: theme.palette.common.white,
  },

  icon: {
    color: theme.palette.common.white,
  },
  favoriteIcon: {
    background: theme.palette.primary.main,
    color: theme.palette.common.white,
    margin: '0 0 0 3px',
    '&: hover': {
      background: theme.palette.primary.dark,
    },
  },
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
    <Stack
      sx={sx.container}
      direction="row"
      alignItems="center"
      justifyContent="space-between"
    >
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
          <Button sx={sx.buttonGroup} onClick={onAddToCart} variant="contained">
            {t('addToCart')}
          </Button>
        )}
        {count !== 0 && (
          <Stack direction="row" alignItems="center" sx={sx.buttonGroup}>
            <IconButton sx={sx.icon} size="small" onClick={onRemoveFromCart}>
              {/* {count !== 1 ? <RemoveIcon /> : <DeleteIcon />} */}
              <RemoveIcon />
            </IconButton>
            <Typography sx={{ padding: '0 20px' }} variant="h6">
              {count} {isWeightGood && t('g')}
            </Typography>
            <IconButton sx={sx.icon} size="small" onClick={onAddToCart}>
              <AddIcon />
            </IconButton>
          </Stack>
        )}
        <IconButton
          sx={sx.favoriteIcon}
          onClick={onAddToFavorite}
          component={'symbol'}
        >
          <FavoriteIcon />
        </IconButton>
      </Stack>
    </Stack>
  );
};
