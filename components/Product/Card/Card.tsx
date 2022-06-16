import React from 'react';
import { CardMedia } from '@mui/material';
import Image from 'next/image';

import { Box } from '../../UI/Box/Box';
import { Typography } from '../../UI/Typography/Typography';
import { ProductCardRate as Rate } from './Rate';
import { ProductCardDocket as Docket } from './Docket';
import { ProductCardCart as Cart } from './Cart';
import { Currency } from '../../../@types/entities/Currency';
import defaultImage from '../../../assets/no-image.svg';
import HeartIcon from '@mui/icons-material/Favorite';

import sx from './Card.styles';

export type ProductCardProps = {
  title: string;
  description: string;
  rating: number;
  currentCount: number;
  isWeightGood: boolean;
  price: number;
  discount?: number;
  previewSrc: string;
  countrySrc?: string;
  currency: Currency;
  inCart: boolean;
  isElected: boolean;
  onAdd: () => void;
  onRemove: () => void;
  onElect: () => void;
  onDetail: () => void;
};

export function ProductCard({
  title,
  description,
  currentCount,
  rating,
  isWeightGood,
  discount = 0,
  price,
  previewSrc,
  countrySrc,
  isElected,
  currency,
  onAdd,
  onRemove,
  onElect,
  onDetail,
}: ProductCardProps) {
  return (
    <Box sx={sx.card}>
      <Box sx={sx.preview}>
        <HeartIcon sx={{ ...sx.heart, ...(isElected && sx.elected) }} onClick={onElect} />

        <CardMedia sx={sx.previewImg} component="img" image={previewSrc || defaultImage} alt="" onClick={onDetail} />

        {countrySrc && (
          <Box sx={sx.country}>
            <Image src={countrySrc} objectFit="cover" height={26} width={26} alt="" />
          </Box>
        )}
      </Box>

      <Rate currency={currency} rating={rating} price={price} isWeightGood={isWeightGood} />

      <Box sx={sx.info}>
        <div role="button" tabIndex={0} onKeyPress={undefined} onClick={onDetail}>
          <Typography sx={sx.title} variant="h6">
            {title}
          </Typography>
        </div>

        <Typography variant="body2" sx={sx.description}>
          {description}
        </Typography>
      </Box>

      <Box sx={{ ...sx.actions, ...(currentCount !== 0 && sx.deployed) }}>
        <Docket
          inCart={currentCount !== 0}
          price={price}
          discount={discount}
          isWeightGood={false}
          currency={currency}
        />

        <Cart currentCount={currentCount} onAdd={onAdd} onRemove={onRemove} isWeightGood={isWeightGood} />
      </Box>
    </Box>
  );
}
