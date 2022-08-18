import React from 'react';
import { Card, CardContent, CardMedia, Grid } from '@mui/material';

import translations from './Card.i18n.json';
import { useLocalTranslation } from '../../../hooks/useLocalTranslation';
import { Typography } from '../../UI/Typography/Typography';
import { Box } from '../../UI/Box/Box';
import { Currency } from '../../../@types/entities/Currency';
import { getCurrencySymbol } from '../../../helpers/currencyHelper';
import { useAppNavigation } from 'components/Navigation';

import sx from './CardProduct.styles';

export type OrderProductType = {
  id: number;
  photo: string;
  title: string;
  weight: number;
  amount: number;
  cost: number;
  isWeightGood: boolean;
};

type OrderCardProductProps = {
  product: OrderProductType;
  currency: Currency;
};

export const OrderCardProduct = ({ currency, product }: OrderCardProductProps) => {
  const { goToProductPage } = useAppNavigation();

  const { t } = useLocalTranslation(translations);

  const { photo, title, weight, amount, cost, isWeightGood } = product;

  const handleClickDetail = () => goToProductPage(product.id);

  return (
    <Box sx={sx.card}>
      <CardMedia
        sx={{ ...sx.image, display: { sm: 'none', xs: 'flex' } }}
        component="img"
        image={photo}
        onClick={handleClickDetail}
      />

      <Grid container sx={{ display: 'flex', alignItems: 'center' }}>
        <Grid container item xs={12} sm={8} sx={{ display: 'flex', alignItems: 'center' }}>
          <CardMedia
            sx={{ ...sx.image, display: { sm: 'flex', xs: 'none' } }}
            component="img"
            image={photo}
            onClick={handleClickDetail}
          />

          <Typography variant="body1" sx={sx.title} onClick={handleClickDetail}>
            {title}
          </Typography>
        </Grid>

        <Grid item sm={2} xs={6} sx={sx.count}>
          <Typography variant="body1" sx={sx.countText} color="text.muted">
            {!isWeightGood ? `${amount} ${t('pc')}.` : `${weight} ${t('g')}.`}
          </Typography>
        </Grid>

        <Grid item sm={2} xs={6} sx={sx.price}>
          <Typography variant="body1" sx={sx.priceText}>
            {cost} {getCurrencySymbol(currency)}
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
};
