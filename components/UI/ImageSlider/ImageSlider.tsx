/* eslint-disable react/no-array-index-key */
import React, { useState } from 'react';
import SwiperCore, { EffectFade, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { SxProps } from '@mui/material';
import Image from 'next/image';

import { Box } from '../Box/Box';

import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/pagination';

import styles from './ImageSlider.module.scss';

import defaultImage from '../../../assets/no-image.svg';

const sliderSx = {
  container: {
    width: {
      md: '580px',
      xs: '100%',
    },
    maxWidth: {
      sm: '660px',
    },
    marginLeft: 0,
    marginRight: 0,
  },
  scroll: {
    display: {
      md: 'flex',
      xs: 'none',
    },
    overflow: 'scroll',
    padding: '10px 0',
  },
  slide: {
    borderRadius: '10px',
    overflow: 'hidden',
    position: 'relative',
  },
  full: {
    height: {
      md: '500px',
      sm: '540px',
      xs: '300px',
    },
    width: '100%',
  },
  small: {
    cursor: 'pointer',
    height: '80px',
    width: '90px',
    marginRight: '14px',

    '&:last-child': {
      marginRight: 0,
    },
  },
  active: {
    border: '2px solid',
    borderColor: 'accent.main',
  },
};

export type ImageSliderProps = {
  images: {
    small: string;
    full: string;
  }[];
  sx?: SxProps;
};

const defaultImages = [{ full: defaultImage, small: defaultImage }];

export function ImageSlider({ images, sx }: ImageSliderProps) {
  const [activeId, setActiveId] = useState(0);

  const [slider, setSlider] = useState<SwiperCore | null>(null);

  const existImages = !images.length ? defaultImages : images;

  const screenWidth = window.screen.width;

  const slideTo = (i: number) => {
    setActiveId(i);
    slider?.slideTo(i);
  };

  return (
    <Box sx={{ ...sliderSx.container, ...sx }}>
      <div className={styles.sliderWrapper}>
        <Swiper
          pagination={screenWidth < 900}
          modules={[EffectFade, Pagination]}
          effect='fade'
          onSwiper={setSlider}
          onSlideChange={swiper => slideTo(swiper.activeIndex)}
        >
          {existImages.map((image, i) => (
            <SwiperSlide key={image.full + i}>
              <Box sx={{ ...sliderSx.slide, ...sliderSx.full }}>
                <Image src={image.full} layout='fill' objectFit='cover' alt='' />
              </Box>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {existImages.length > 1 && (
        <Box sx={sliderSx.scroll}>
          {existImages.map((image, i) => (
            <Box
              key={image.small + i}
              sx={{ ...sliderSx.slide, ...sliderSx.small, ...(activeId === i && sliderSx.active) }}
            >
              <Image src={image.small} layout='fill' objectFit='cover' alt='' onClick={() => slideTo(i)} />
            </Box>
          ))}
        </Box>
      )}
    </Box>
  );
}
