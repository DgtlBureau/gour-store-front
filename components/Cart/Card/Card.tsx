import React from 'react';
import { Card, CardContent, CardActions, CardMedia } from '@mui/material';

import { Box } from '../../UI/Box/Box';
import { Typography } from '../../UI/Typography/Typography';
import { Button } from '../../UI/Button/Button';
import { IconButton } from '../../UI/IconButton/IconButton';

import PlusIcon from '@mui/icons-material/Add';
import MinusIcon from '@mui/icons-material/Remove';

import sx from './Card.styles';

type Props = {
  title: string;
  price: number;
  amount: number;
  productImg: string;
  discount?: number;
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
  onElect,
  onDelete,
  onAdd,
  onSubtract,
}: Props) {
  return (
    <Card sx={sx.card} >
      <CardMedia sx={sx.image} component="img" image={productImg} />

      <Box sx={sx.info}>
        <CardContent sx={sx.content}>
          <Typography variant="h6" sx={sx.title}>{title}</Typography>

          <Box sx={sx.docket}>
            <Typography variant="h5" sx={sx.price} color={discount ? 'error' : 'primary'}>
              {discount ? Math.round(price * (1 - discount)) : price}
              {' ₽'}
            </Typography>
            {
              discount && (
                <Typography variant="body2" sx={sx.oldPrice}>
                  {price}
                  {' ₽'}
                </Typography>
              )
            }
          </Box>
        </CardContent>

        <CardActions sx={sx.actions}>
          <Box sx={sx.leftActions}>
            <Button variant="text" onClick={onElect}>
              В избранное
            </Button>
            <Button variant="text" onClick={onDelete}>
              Удалить
            </Button>
          </Box>

          <Box sx={sx.edit}>
            <IconButton onClick={onSubtract}>
              <MinusIcon />
            </IconButton>

            <Typography variant="body2" sx={sx.weight}>
              {amount}
              {' г'}
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
