import React from 'react';
import { Card, CardContent, CardMedia } from '@mui/material';

import translations from './Card.i18n.json';
import { useLocalTranslation } from '../../../hooks/useLocalTranslation';
import { Typography } from '../../UI/Typography/Typography';
import { Box } from '../../UI/Box/Box';
import { Currency } from '../../../@types/entities/Currency';
import { getCurrencySymbol } from '../../../helpers/currencyHelper';

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
  onDetail: (id: number) => void;
};

export const OrderCardProduct = ({ currency, product, onDetail }: OrderCardProductProps) => {
  const { t } = useLocalTranslation(translations);

  const { photo, title, weight, amount, cost, isWeightGood } = product;

  const handleClickDetail = () => onDetail(product.id);

  return (
    <Card sx={sx.card}>
      <CardMedia sx={sx.image} component="img" image={photo} onClick={handleClickDetail} />

      <Box sx={sx.info}>
        <CardContent sx={sx.content}>
          <Typography variant="body1" sx={sx.title} onClick={handleClickDetail}>
            {title}
          </Typography>

          <Box sx={{ display: 'flex' }}>
            <Typography variant="body1" sx={sx.count}>
              {!isWeightGood ? `${amount}${t('pc')}.` : `${weight}${t('g')}.`}
            </Typography>

            <Typography variant="body1" sx={sx.productPrice}>
              {cost} {getCurrencySymbol(currency)}
            </Typography>
          </Box>
        </CardContent>
      </Box>
    </Card>
  );
};
