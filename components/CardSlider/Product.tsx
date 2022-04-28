import React, { CSSProperties, ReactNode, useState } from 'react';

import { Button, ButtonGroup, Stack } from '@mui/material';
// eslint-disable-next-line
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Grid } from 'swiper';

import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { Box } from '../UI/Box/Box';
import { Container } from '../UI/Container/Container';
import { Typography } from '../UI/Typography/Typography';

import 'swiper/css';
import 'swiper/css';
import 'swiper/css/grid';
import { CardSlider } from './CardSlider';
import { ProductCard, ProductCardProps } from 'components/Product/Card/Card';

const sx = {
  container: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  } as CSSProperties,
  title: {
    fontWeight: 'bold',
    fontFamily: 'Roboto slab',
    color: 'text.secondary',
  },
  backArrow: {
    transform: 'rotate(-180deg)',
  },
};

type Props = {
  title: string;
  rows?: number;
  productCardPropList: ProductCardProps[];
};

export function ProductCardSlider({
  title,
  rows = 1,
  productCardPropList,
}: Props) {
  const productCardsList = productCardPropList.map(cardProps => (
    <ProductCard {...cardProps} />
  ));

  return (
    <CardSlider
      title={title}
      cardsList={productCardsList}
      spaceBetween={0}
      slidesPerView={4}
      rows={rows}
    />
  );
}
