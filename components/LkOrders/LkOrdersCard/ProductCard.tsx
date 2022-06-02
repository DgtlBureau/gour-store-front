import { Card, CardContent, CardMedia, Divider } from '@mui/material';
import { Box } from '@mui/system';
import { Typography } from '../../UI/Typography/Typography';
import React from 'react';

import sx from './ProductCard.styles';
import { Currency } from '../../../@types/entities/Currency';
import { getCurrencySymbol } from '../../../helpers/currencyHelper';
import translations from './LkOrdersCard.i18n.json';
import { useLocalTranslation } from '../../../hooks/useLocalTranslation';
import defaultImage from '../../../assets/no-image.svg'


export type OrderProductType = {
  photo: string;
  title: string;
  weight: number;
  amount: number;
  cost: number;
  isWeightGood: boolean;
};

type LkOrderProductCardProps = {
  product: OrderProductType;
  currency: Currency;
};

export const OrderProductCard = ({
  currency,
  product,
}: LkOrderProductCardProps) => {
  const { t } = useLocalTranslation(translations);
  const { photo, title, weight, amount, cost, isWeightGood } = product;
  return (
    <Card sx={sx.card}>
      <CardMedia sx={sx.image} component="img" image={photo || defaultImage} />
      <Box sx={sx.info}>
        <CardContent sx={sx.content}>
          <Typography variant="body1" sx={sx.title}>
            {title}
          </Typography>
          <Typography variant="body1" sx={sx.title}>
            {isWeightGood
              ? `${amount}${t('pc')}. / ${weight}${t('g')}.`
              : `${weight}${t('g')}.`}
          </Typography>
          <Typography variant="body1" sx={sx.title}>
            {cost} {getCurrencySymbol(currency)}
          </Typography>
        </CardContent>
      </Box>
    </Card>
  );
};
