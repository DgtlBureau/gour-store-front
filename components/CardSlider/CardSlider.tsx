/* eslint-disable react/no-array-index-key */
import React, { CSSProperties, ReactNode, useState } from 'react';
import { ButtonGroup, Stack, SxProps } from '@mui/material';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Grid } from 'swiper';

import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { Button } from 'components/UI/Button/Button';
import { Box } from '../UI/Box/Box';
import { Typography } from '../UI/Typography/Typography';
import cardCss from './CardSlider.module.scss';

import 'swiper/css';
import 'swiper/css/grid';

const sliderSx = {
  container: {
    maxWidth: '1200px',
    display: 'flex',
    flexDirection: 'column',
  } as CSSProperties,
  title: {
    fontSize: {
      sm: '40px',
      xs: '24px',
    },
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
  head?: ReactNode;
  cardsList: ReactNode[];
  rows?: number;
  spaceBetween?: number;
  slidesPerView?: number;
  sx?: SxProps;
};

export function CardSlider({ title, head, cardsList, rows = 1, slidesPerView = 4, spaceBetween = 10, sx }: Props) {
  const [slider, setSlider] = useState<SwiperCore | null>(null);

  const [edge, setEdge] = useState({
    isBeginning: true,
    isEnd: false,
  });

  const screenWidth = window.screen.width;

  const withArrows = cardsList.length > rows * slidesPerView || screenWidth < 1200;

  const slideChangeHandler = ({ isBeginning, isEnd }: SwiperCore) => setEdge({ isBeginning, isEnd });
  return (
    <Box sx={{ ...sliderSx.container, ...sx }}>
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

      <Box sx={{ width: '100%', marginTop: { xs: '20px', md: '40px' } }}>
        <Swiper
          style={{
            width: '100%',
            height: 'auto',
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
          onSlideChange={slideChangeHandler}
        >
          {cardsList.map((card, i) => (
            <SwiperSlide key={i} className={cardCss.fit}>
              {card}
            </SwiperSlide>
          ))}
        </Swiper>
      </Box>
    </Box>
  );
}
