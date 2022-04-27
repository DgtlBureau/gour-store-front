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
    color: 'text.secondary'
  },
  backArrow: {
    transform: 'rotate(-180deg)',
  },
};

type Props = {
  title: string;
  cardsList: ReactNode[];
  rows?: number;
  spaceBetween?: number;
  slidesPerView?: number;
};

export function CardSlider({
  title,
  cardsList,
  rows = 1,
  slidesPerView,
  spaceBetween = 10,
}: Props) {
  const [slider, setSlider] = useState<SwiperCore | null>(null);

  const cardHeight = slider?.el?.children[0]?.children[0]?.scrollHeight || 0;

  return (
    <Container sx={sx.container}>
      <Stack
        sx={{ width: '100%' }}
        direction="row"
        alignItems="center"
        justifyContent="space-between"
      >
        <Typography variant="h4" sx={sx.title}>{title}</Typography>
        <ButtonGroup>
          <Button onClick={() => slider?.slidePrev()}>
            <ArrowForwardIosIcon fontSize="small" sx={sx.backArrow} />
          </Button>
          <Button onClick={() => slider?.slideNext()}>
            <ArrowForwardIosIcon fontSize="small" />
          </Button>
        </ButtonGroup>
      </Stack>
      <Box sx={{ width: '100%', margin: '20px 0 0 0' }}>
        <Swiper
          style={{
            width: '100%',
            height: `${cardHeight * rows + spaceBetween * rows}px`,
          }}
          spaceBetween={spaceBetween}
          slidesPerView={slidesPerView || 'auto'}
          grid={{
            rows: rows,
          }}
          onSwiper={setSlider}
          modules={[Grid]}
          className="mySwiper"
        >
          {cardsList.map((card, i) => (
            <SwiperSlide key={i} style={{ height: `${cardHeight}px` }}>
              {card}
            </SwiperSlide>
          ))}
        </Swiper>
      </Box>
    </Container>
  );
}
