import React from 'react';

import { CardMedia, Grid } from '@mui/material';

import { useAppNavigation } from 'components/Navigation';
import { Box } from 'components/UI/Box/Box';
import { Typography } from 'components/UI/Typography/Typography';

import { Currency } from 'types/entities/Currency';

import { useLocalTranslation } from 'hooks/useLocalTranslation';
import { getCurrencySymbol } from 'utils/currencyUtil';

import translations from './Card.i18n.json';
import sx from './CardProduct.styles';

export type OrderProductType = {
  id: number;
  photo: string;
  title: string;
  amount: number;
  gram: number;
  totalSum: number;
  totalSumWithoutAmount: number;
  cost: number;
};

type OrderCardProductProps = {
  product: OrderProductType;
  currency: Currency;
};

export function OrderCardProduct({ currency, product }: OrderCardProductProps) {
  const { goToProductPage } = useAppNavigation();

  const { t } = useLocalTranslation(translations);

  const { photo, title, amount, gram, cost } = product;

  const handleClickDetail = () => goToProductPage(product.id);

  return (
    <Box sx={sx.card}>
      <CardMedia
        sx={{ ...sx.image, display: { sm: 'none', xs: 'flex' } }}
        component='img'
        image={photo}
        onClick={handleClickDetail}
      />

      <Grid container sx={{ display: 'flex', alignItems: 'center' }}>
        <Grid container item xs={12} sm={7} sx={{ display: 'flex', alignItems: 'center' }}>
          <CardMedia
            sx={{ ...sx.image, display: { sm: 'flex', xs: 'none' } }}
            component='img'
            image={photo}
            onClick={handleClickDetail}
          />

          <Typography variant='body1' sx={sx.title} onClick={handleClickDetail}>
            {title}
          </Typography>
        </Grid>

        <Grid item sm={1.5} xs={4} sx={sx.count}>
          <Typography variant='body1' sx={sx.countText} color='text.muted'>
            {gram} {t('g')}.
          </Typography>
        </Grid>

        <Grid item sm={1.5} xs={4} sx={sx.count}>
          <Typography variant='body1' sx={sx.countText} color='text.muted'>
            {amount} {t('pc')}.
          </Typography>
        </Grid>

        <Grid item sm={2} xs={4} sx={sx.price}>
          <Typography variant='body1' sx={sx.priceText}>
            {cost} {getCurrencySymbol(currency)}
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
}
