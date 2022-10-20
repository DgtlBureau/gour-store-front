/* eslint-disable react/no-array-index-key */
import React, { ReactNode, useState } from 'react';

import SwiperCore, { Grid } from 'swiper';
import 'swiper/css';
import 'swiper/css/grid';
import { Swiper, SwiperSlide } from 'swiper/react';

import { ButtonGroup, Stack, SxProps } from '@mui/material';

import { Box } from 'components/UI/Box/Box';
import { Button } from 'components/UI/Button/Button';
import { Typography } from 'components/UI/Typography/Typography';

import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

import sliderSx from './CardSlider.styles';

type Props = {
  title?: string;
  emptyTitle?: string;
  head?: ReactNode;
  cardsList: ReactNode[];
  rows?: number;
  spaceBetween?: number;
  slidesPerView?: number;
  sx?: SxProps;
};

export function CardSlider({
  title,
  emptyTitle,
  head,
  cardsList,
  rows = 1,
  slidesPerView = 4,
  spaceBetween = 10,
  sx,
}: Props) {
  const [slider, setSlider] = useState<SwiperCore | null>(null);

  const [edge, setEdge] = useState({
    isBeginning: true,
    isEnd: false,
  });

  const screenWidth = window.screen.width;

  const withArrows = cardsList.length > rows * slidesPerView || screenWidth < 1200;

  const changeSlide = ({ isBeginning, isEnd }: SwiperCore) => setEdge({ isBeginning, isEnd });
  return (
    <Box sx={{ ...sliderSx.container, ...sx } as SxProps}>
      <Stack sx={{ width: '100%' }} direction='row' alignItems='center' justifyContent='space-between'>
        <Typography variant='h4' sx={sliderSx.title}>
          {title}
        </Typography>

        {withArrows && (
          <ButtonGroup sx={sliderSx.arrows}>
            <Button variant='outlined' disabled={edge.isBeginning} onClick={() => slider?.slidePrev()}>
              <ArrowForwardIosIcon fontSize='small' sx={sliderSx.backArrow} />
            </Button>

            <Button variant='outlined' disabled={edge.isEnd} onClick={() => slider?.slideNext()}>
              <ArrowForwardIosIcon fontSize='small' />
            </Button>
          </ButtonGroup>
        )}
      </Stack>

      {head}

      {cardsList.length ? (
        <Box sx={{ width: '100%', marginTop: { xs: '20px', md: '40px' } }}>
          <Swiper
            style={{
              width: '100%',
              overflowX: 'clip',
              overflowY: 'visible',
            }}
            spaceBetween={spaceBetween}
            grid={{
              fill: 'row',
              rows,
            }}
            onSwiper={setSlider}
            modules={[Grid]}
            className='mySwiper'
            slidesPerView='auto'
            onSlideChange={changeSlide}
          >
            {cardsList.map((card, i) => (
              <SwiperSlide key={i} style={sliderSx.slide}>
                {card}
              </SwiperSlide>
            ))}
          </Swiper>
        </Box>
      ) : (
        <Typography variant='h5' color='primary' sx={sliderSx.emptyTitle}>
          {emptyTitle || 'Список карточек пуст'}
        </Typography>
      )}
    </Box>
  );
}
