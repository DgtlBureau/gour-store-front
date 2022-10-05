import React from 'react';

import { Card, CardActions, CardContent, CardMedia } from '@mui/material';

import { Box } from 'components/UI/Box/Box';
import { Button } from 'components/UI/Button/Button';
import { IconButton } from 'components/UI/IconButton/IconButton';
import { Typography } from 'components/UI/Typography/Typography';

import { Currency } from 'types/entities/Currency';

import { useLocalTranslation } from 'hooks/useLocalTranslation';

import PlusIcon from '@mui/icons-material/Add';
import CancelIcon from '@mui/icons-material/Cancel';
import MinusIcon from '@mui/icons-material/Remove';
import defaultImg from 'assets/no-image.svg';

import translations from './Card.i18n.json';
import sx from './Card.styles';
import { CartCardDocket as Docket } from './Docket';

type Props = {
  title: string;
  price: number;
  weight: number;
  amount: number;
  productImg: string;
  backgroundImg?: string;
  isWeightGood: boolean;
  discount?: number;
  currency?: Currency;
  onDetail: () => void;
  onAdd: () => void;
  onSubtract: () => void;
  onDelete: () => void;
};

export function CartCard({
  title,
  price,
  amount,
  productImg,
  backgroundImg,
  discount,
  weight,
  isWeightGood,
  currency = 'cheeseCoin',
  onDetail,
  onDelete,
  onAdd,
  onSubtract,
}: Props) {
  const { t } = useLocalTranslation(translations);

  const screenWidth = window.screen.width;

  const backgroundImage = `url('${backgroundImg}')`;

  return (
    <Card sx={sx.card}>
      <Box sx={{ ...sx.previewImg, backgroundImage }} onClick={onDetail}>
        <CardMedia sx={sx.productImg} component='img' image={productImg || defaultImg} alt='' />
      </Box>

      <Box sx={sx.info}>
        <CardContent sx={sx.content}>
          <Typography variant='h6' sx={sx.title} onClick={onDetail}>
            {title}
          </Typography>

          {screenWidth > 600 ? (
            <Docket currency={currency} discount={discount} price={price} amount={amount} />
          ) : (
            <IconButton size='small' onClick={onDelete} sx={sx.cancelBtn}>
              <CancelIcon />
            </IconButton>
          )}
        </CardContent>

        <CardActions sx={sx.actions}>
          <Button variant='text' onClick={onDelete} sx={sx.deleteBtn}>
            {t('delete')}
          </Button>

          <Box sx={sx.edit}>
            <IconButton onClick={onSubtract}>
              <MinusIcon />
            </IconButton>

            <Typography variant='body2' sx={sx.weight}>
              {isWeightGood ? weight : amount} {isWeightGood ? t('g') : t('piece')}
            </Typography>

            <IconButton onClick={onAdd}>
              <PlusIcon />
            </IconButton>
          </Box>

          {screenWidth <= 600 && <Docket currency={currency} discount={discount} price={price} amount={amount} />}
        </CardActions>
      </Box>
    </Card>
  );
}
