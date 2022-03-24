import React, { CSSProperties, ReactNode, useState } from 'react';

import { Button, ButtonGroup, Stack } from '@mui/material';
// eslint-disable-next-line
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Grid, Navigation } from 'swiper';

import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { Box } from '../UI/Box/Box';
import { Container } from '../UI/Container/Container';
import { Typography } from '../UI/Typography/Typography';

import './CardSlider.module.scss';

import 'swiper/css';
import 'swiper/css/grid';

type Card = {
  id: number;
  element: ReactNode;
};

type Props = {
  title: string;
  cardsList: Card[];
  rows?: number;
  cardHeight?: number;
  spaceBetween?: number;
  slidesPerView?: number;
};

const wrapperBoxSx: CSSProperties = {
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
};

export function CardSlider({
  title,
  cardsList,
  rows = 1,
  slidesPerView = 4,
  spaceBetween = 10,
  cardHeight = 195,
}: Props) {
  const [slider, setSlider] = useState<SwiperCore | null>(null);

  console.log(slider);

  return (
    <Container sx={wrapperBoxSx}>
      <Stack
        sx={{ width: '100%' }}
        direction="row"
        alignItems="center"
        justifyContent="space-between"
      >
        <Typography variant="h4">{title}</Typography>
        <ButtonGroup>
          <Button onClick={() => slider?.slidePrev()}>
            <ArrowBackIosIcon />
          </Button>
          <Button onClick={() => slider?.slideNext()}>
            <ArrowForwardIosIcon />
          </Button>
        </ButtonGroup>
      </Stack>
      <Box sx={{ width: '100%', margin: '20px 0 0 0' }}>
        <Swiper
          style={{
            padding: '10px',
            width: '100%',
            height: `${cardHeight * rows + spaceBetween * (rows)}px`,
          }}
          spaceBetween={spaceBetween}
          slidesPerView={slidesPerView}
          grid={{
            rows: rows,
          }}
          onSwiper={setSlider}
          modules={[Grid]}
          className="mySwiper"
        >
          {cardsList.map(card => (
            <SwiperSlide key={card.id} style={{ height: `${cardHeight}px` }}>
              {card.element}
            </SwiperSlide>
          ))}
        </Swiper>
      </Box>
    </Container>
  );
}
