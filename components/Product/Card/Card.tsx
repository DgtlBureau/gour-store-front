import React from 'react';
import { Card, CardContent, CardMedia, CardActions } from '@mui/material';
import Image from 'next/image';

import { Box } from '../../UI/Box/Box';
import { Typography } from '../../UI/Typography/Typography';
import { ProductCardRate as Rate } from './Rate';
import { ProductCardDocket as Docket } from './Docket';
import { ProductCardCart as Cart } from './Cart';
import { Currency } from '../../../@types/entities/Currency';

import HeartIcon from '@mui/icons-material/Favorite';

const renderCountryIcon = (country: string | number) => {
  switch (country) {
    case 'Russia':
    case 'RU':
    case 'RUS':
      return russiaIcon
    case 'GreatBritain':
    case 'GB':
    case 'UK':
    case 'GBR':
      return ukIcon
    case 'Italy':
    case 'IT':
    case 'ITA':
      return italyIcon
    case 'Netherlands':
    case 'NL':
    case 'NLD':
      return netherlandsIcon
    case 'Spain':
    case 'ES':
    case 'ESP':
      return spainIcon
    case 'France':
    case 'FR':
    case 'FRA':
      return franceIcon
    default:
      return russiaIcon
  }
}

import sx from './Card.styles';

import russiaIcon from '../../../assets/icons/countries/russia.svg';
import ukIcon from '../../../assets/icons/countries/great-britain.svg';
import italyIcon from '../../../assets/icons/countries/italy.svg';
import netherlandsIcon from '../../../assets/icons/countries/netherlands.svg';
import spainIcon from '../../../assets/icons/countries/spain.svg';
import franceIcon from '../../../assets/icons/countries/france.svg';

export type ProductCardProps = {
  title: string;
  description: string;
  rating: number;
  currentCount: number;
  isWeightGood: boolean;
  price: number;
  discount?: number;
  previewSrc: string;
  countrySrc: string | number;
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
          {countrySrc && (
            <Box sx={sx.country}>
              <Image
                src={renderCountryIcon(countrySrc)}
                objectFit="cover"
                height={26}
                width={26}
                alt={"country"+ countrySrc}
              />
            </Box>
          )}
        </Box>

        <Rate
          currency={currency}
          rating={rating}
          price={price}
          isWeightGood={isWeightGood}
        />

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

      <CardActions
        sx={{ ...sx.actions, ...(currentCount !== 0 && sx.deployed) }}
      >
        <Docket
          inCart={currentCount !== 0}
          price={price}
          discount={discount}
          isWeightGood={false}
          currency={currency}
        />

        <Cart
          currentCount={currentCount}
          onAdd={onAdd}
          onRemove={onRemove}
          isWeightGood={isWeightGood}
        />
      </CardActions>
    </Card>
  );
}
