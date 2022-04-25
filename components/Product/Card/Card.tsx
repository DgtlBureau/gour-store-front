import React from 'react';
import {
  Card,
  CardContent,
  CardMedia,
  CardActions,
} from '@mui/material';
import Image from 'next/image';

import { Box } from '../../UI/Box/Box';
import { Typography } from '../../UI/Typography/Typography';
import { ProductCardRate as Rate } from './Rate';
import { ProductCardDocket as Docket } from './Docket';
import { ProductCardCart as Cart } from './Cart';
import { Weight } from '../../../@types/entities/Weight';

import HeartIcon from '@mui/icons-material/Favorite';

import sx from './Card.styles';

export type ProductCardProps = {
  title: string;
  description: string;
  rating: number;
  weightId: number;
  weights: Weight[];
  price: number;
  discount?: number;
  cost: string;
  previewSrc: string;
  countrySrc?: string;
  inCart: boolean;
  isElected: boolean;
  onAdd: () => void;
  onRemove: () => void;
  onEdit: (id: number) => void;
  onElect: () => void;
  onDetail: () => void;
};

export function ProductCard({
  title,
  description,
  rating,
  weightId,
  weights,
  discount = 0,
  price,
  cost,
  previewSrc,
  countrySrc,
  inCart,
  isElected,
  onAdd,
  onRemove,
  onEdit,
  onElect,
  onDetail,
}: ProductCardProps) {
  const currentWeight = weights[weightId];

  const increaseWeight = () => onEdit(weightId + 1);
  const decreaseWeight = weightId === 0 ? onRemove : () => onEdit(weightId - 1);

  return (
    <Card sx={sx.card} color="white">
      <CardContent sx={sx.content}>
        <Box sx={sx.preview}>
          <HeartIcon
            sx={{ ...sx.heart, ...(isElected && sx.elected) }}
            onClick={onElect}
          />

          <CardMedia
            sx={sx.previewImg}
            component="img"
            image={previewSrc}
            alt=""
            onClick={onDetail}
          />

          {
            countrySrc && (
              <Box sx={sx.country}>
                <Image src={countrySrc} objectFit="cover" height={26} width={26} alt="" />
              </Box>
            )
          }
        </Box>

        <Rate rating={rating} cost={cost} />

        <Box sx={sx.info}>
          <div
            role="button"
            tabIndex={0}
            onKeyPress={undefined}
            onClick={onDetail}
          >
            <Typography sx={sx.title} variant="h6">
              {title}
            </Typography>
          </div>

          <Typography variant="body2" sx={sx.description}>
              {description}
            </Typography>
        </Box>
      </CardContent>

      <CardActions sx={{ ...sx.actions, ...(inCart && sx.deployed) }}>
        <Docket
          inCart={inCart}
          currentWeight={currentWeight}
          weights={weights}
          weightId={weightId}
          price={price}
          discount={discount}
          onEdit={onEdit}
        />

        <Cart
          inCart={inCart}
          currentWeight={currentWeight}
          weights={weights}
          weightId={weightId}
          onAdd={onAdd}
          increaseWeight={increaseWeight}
          decreaseWeight={decreaseWeight}
        />
      </CardActions>
    </Card>
  );
}
