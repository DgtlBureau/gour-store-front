import React, { ReactNode, useState } from 'react';

import { SxProps, Theme, useMediaQuery } from '@mui/material';
import SwiperCore, { Grid } from 'swiper';
import 'swiper/css';
import 'swiper/css/grid';
import { Swiper, SwiperSlide } from 'swiper/react';

import { Box } from 'components/UI/Box/Box';
import { Typography } from 'components/UI/Typography/Typography';

import { CardSliderArrows } from './CardSliderArrows';

import sliderSx from './CardSlider.styles';

type Props = {
  title?: string;
  emptyText?: string;
  head?: ReactNode;
  cardList: ReactNode[];
  rows?: number;
  spaceBetween?: number;
  slidesPerRow?: number;
  sx?: SxProps;
};

export function CardSlider({
  title,
  emptyText = 'Список карточек пуст',
  head,
  cardList,
  rows = 1,
  slidesPerRow = 4,
  spaceBetween = 10,
  sx,
}: Props) {
  const [slider, setSlider] = useState<SwiperCore | null>(null);

  const [edge, setEdge] = useState({
    isBeginning: true,
    isEnd: false,
  });

  const isDesktop = useMediaQuery((theme: Theme) => theme.breakpoints.up('md'));

  const withArrows = isDesktop && cardList.length > rows * slidesPerRow;

  const changeSlide = ({ isBeginning, isEnd }: SwiperCore) => setEdge({ isBeginning, isEnd });

  return (
    <Box sx={{ ...sliderSx.container, ...sx } as SxProps}>
      <Box sx={sliderSx.titleWrapper}>
        <Typography variant='h4' sx={sliderSx.title}>
          {title}
        </Typography>

        {withArrows && (
          <CardSliderArrows
            isPrevDisabled={edge.isBeginning}
            isNextDisabled={edge.isEnd}
            onClickPrev={() => slider?.slidePrev()}
            onClickNext={() => slider?.slideNext()}
          />
        )}
      </Box>

      {head}

      {cardList.length ? (
        <Box sx={sliderSx.cardList}>
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
            {cardList.map((card, i) => (
              // eslint-disable-next-line react/no-array-index-key
              <SwiperSlide key={i} style={sliderSx.slide}>
                {card}
              </SwiperSlide>
            ))}
          </Swiper>
        </Box>
      ) : (
        <Typography variant='h5' color='primary' sx={sliderSx.emptyText}>
          {emptyText}
        </Typography>
      )}
    </Box>
  );
}
