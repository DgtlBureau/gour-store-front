import React from 'react';
import { Card, CardContent, CardActions, CardMedia } from '@mui/material';

import { Box } from '../../UI/Box/Box';
import { Typography } from '../../UI/Typography/Typography';
import { Button } from '../../UI/Button/Button';
import { IconButton } from '../../UI/IconButton/IconButton';
import { getCurrencySymbol } from '../../../helpers/currencyHelper';
import { useLocalTranslation } from '../../../hooks/useLocalTranslation';
import defaultImage from '../../../assets/no-image.svg'
import translations from './Card.i18n.json';
import { Currency } from '../../../@types/entities/Currency';

import PlusIcon from '@mui/icons-material/Add';
import MinusIcon from '@mui/icons-material/Remove';

import sx from './Card.styles';

type Props = {
  title: string;
  price: number;
  weight: number;
  amount: number;
  productImg: string;
  isWeightGood: boolean;
  discount?: number;
  currency?: Currency;
  onElect: () => void;
  onAdd: () => void;
  onSubtract: () => void;
  onDelete: () => void;
};

export function CartCard({
  title,
  price,
  amount,
  productImg,
  discount,
  weight,
  isWeightGood,
  currency = 'cheeseCoin',
  onElect,
  onDelete,
  onAdd,
  onSubtract,
}: Props) {
  const { t } = useLocalTranslation(translations);
  const currencySymbol = getCurrencySymbol(currency);
  const totalPrice = discount
    ? Math.round(price * (1 - discount / 100))
    : price;

  return (
    <Card sx={sx.card}>
      <CardMedia sx={sx.image} component="img" image={productImg || defaultImage} />

      <Box sx={sx.info}>
        <CardContent sx={sx.content}>
          <Typography variant="h6" sx={sx.title}>
            {title}
          </Typography>

          <Box sx={sx.docket}>
            <Typography
              variant="h5"
              sx={sx.price}
              color={discount ? 'error' : 'primary'}
            >
              {totalPrice * amount} {currencySymbol}
            </Typography>
            {!!discount && (
              <Typography variant="body2" sx={sx.oldPrice}>
                {price * amount} {currencySymbol}
              </Typography>
            )}
          </Box>
        </CardContent>

        <CardActions sx={sx.actions}>
          <Box sx={sx.leftActions}>
            <Button variant="text" onClick={onElect}>
              {t('elect')}
            </Button>
            <Button variant="text" onClick={onDelete}>
              {t('delete')}
            </Button>
          </Box>

          <Box sx={sx.edit}>
            <IconButton onClick={onSubtract}>
              <MinusIcon />
            </IconButton>

            <Typography variant="body2" sx={sx.weight}>
              {isWeightGood ? weight : amount}{' '}
              {isWeightGood ? t('g') : t('piece')}
            </Typography>

            <IconButton onClick={onAdd}>
              <PlusIcon />
            </IconButton>
          </Box>
        </CardActions>
      </Box>
    </Card>
  );
}
