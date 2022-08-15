import React from 'react';
import { Grid, SxProps } from '@mui/material';

import CartIcon from '@mui/icons-material/ShoppingCart';
import PlusIcon from '@mui/icons-material/Add';
import MinusIcon from '@mui/icons-material/Remove';
import TrashIcon from '@mui/icons-material/DeleteForever';
import FavoriteIcon from '@mui/icons-material/Favorite';

import translations from './Actions.i18n.json';
import { useLocalTranslation } from '../../../hooks/useLocalTranslation';
import { Box } from '../../UI/Box/Box';
import { Typography } from '../../UI/Typography/Typography';
import { IconButton } from '../../UI/IconButton/IconButton';
import { getCurrencySymbol } from '../../../helpers/currencyHelper';
import { Currency } from '../../../@types/entities/Currency';

import sxActions from './Actions.styles';

export type ProductActionsProps = {
  price: number;
  discount?: number;
  isWeightGood?: boolean;
  currency: Currency;
  count: number;
  sx?: SxProps;
  isElect: boolean;
  onAdd: () => void;
  onRemove: () => void;
  onElect: () => void;
};

export const ProductActions = ({
  price,
  count,
  discount = 0,
  currency,
  sx,
  isElect,
  onAdd,
  onRemove,
  onElect,
  isWeightGood,
}: ProductActionsProps) => {
  const { t } = useLocalTranslation(translations);

  const pricePerCount = isWeightGood ? price / 100 : price;

  const total = pricePerCount * ((100 - discount) / 100);

  return (
    <Box sx={{ ...sxActions.container, ...sx }}>
      <Box sx={sxActions.docket}>
        <Box sx={sxActions.total}>
          <Typography variant="h6" color={discount ? 'error' : 'primary'} sx={sxActions.price}>
            {total}
            {getCurrencySymbol(currency)}
          </Typography>
        </Box>

        {!!discount && (
          <>
            <Typography variant="body2" sx={sxActions.oldPrice}>
              {pricePerCount}
              {getCurrencySymbol(currency)}
            </Typography>
          </>
        )}

        <Typography variant="body2">
          {'/'} {isWeightGood ? `100${t('g')}` : t('pcs')}
        </Typography>
      </Box>

      <Box sx={sxActions.actions}>
        <Box sx={sxActions.cart}>
          {count === 0 ? (
            <IconButton onClick={onAdd}>
              <CartIcon sx={sxActions.icon} />
            </IconButton>
          ) : (
            <Grid container sx={sxActions.btnGroup}>
              <Grid item xs={4} sx={sxActions.action}>
                <IconButton onClick={onRemove}>
                  {count === 1 ? <TrashIcon sx={sxActions.icon} /> : <MinusIcon sx={sxActions.icon} />}
                </IconButton>
              </Grid>

              <Grid item xs={4} sx={sxActions.action}>
                {count} {isWeightGood ? t('g') : t('pcs')}
              </Grid>

              <Grid item xs={4} sx={sxActions.action}>
                <IconButton onClick={onAdd}>
                  <PlusIcon sx={sxActions.icon} />
                </IconButton>
              </Grid>
            </Grid>
          )}
        </Box>

        <IconButton sx={isElect ? sxActions.favoriteBtn : sxActions.favoriteElect} onClick={onElect}>
          <FavoriteIcon sx={sxActions.icon} />
        </IconButton>
      </Box>
    </Box>
  );
};
