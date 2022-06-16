import React, { CSSProperties, ReactNode, useState } from 'react';

import { Button, ButtonGroup, Stack, SxProps } from '@mui/material';
// eslint-disable-next-line
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Grid } from 'swiper';

import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { Box } from '../UI/Box/Box';
import { Typography } from '../UI/Typography/Typography';
import cardCss from './CardSlider.module.scss';

import 'swiper/css';
import 'swiper/css';
import 'swiper/css/grid';

const sliderSx = {
  container: {
    maxWidth: '1200px',
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
  arrows: {
    display: {
      xs: 'none',
      md: 'flex',
    },
  },
};

type Props = {
  title?: string;
  cardsList: ReactNode[];
  rows?: number;
  spaceBetween?: number;
  slidesPerView?: number;
  sx?: SxProps;
};

export function CardSlider({ title, cardsList, rows = 1, slidesPerView = 4, spaceBetween = 10, sx }: Props) {
  const [slider, setSlider] = useState<SwiperCore | null>(null);

  const cardHeight = slider?.el?.children[0]?.children[0]?.scrollHeight || 0;

  const withArrows = cardsList.length > rows * slidesPerView;

  return (
    <Box sx={{ ...sliderSx.container, ...sx }}>
      <Stack sx={{ width: '100%' }} direction="row" alignItems="center" justifyContent="space-between">
        <Typography variant="h4" sx={sliderSx.title}>
          {title}
        </Typography>

        {withArrows && (
          <ButtonGroup sx={sliderSx.arrows}>
            <Button onClick={() => slider?.slidePrev()}>
              <ArrowForwardIosIcon fontSize="small" sx={sliderSx.backArrow} />
            </Button>

            <Button onClick={() => slider?.slideNext()}>
              <ArrowForwardIosIcon fontSize="small" />
            </Button>
          </ButtonGroup>
        )}
      </Stack>

      <Box sx={{ width: '100%', marginTop: { xs: '20px', md: '40px' } }}>
        <Swiper
          style={{
            width: '100%',
            height: `${cardHeight * rows + spaceBetween * (rows - 1)}px`,
          }}
          spaceBetween={spaceBetween}
          grid={{
            fill: 'row',
            rows: rows,
          }}
          onSwiper={setSlider}
          modules={[Grid]}
          className="mySwiper"
          slidesPerView="auto"
        >
          {cardsList.map((card, i) => (
            <SwiperSlide key={i} style={{ height: `${cardHeight}px` }} className={cardCss.fit}>
              {card}
            </SwiperSlide>
          ))}
        </Swiper>
      </Box>
    </Box>
  );
}
