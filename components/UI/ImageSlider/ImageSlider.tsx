/* eslint-disable import/no-unresolved */
import React, { useEffect, useState } from 'react';
import SwiperCore, { EffectFade, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import Image from 'next/image';

import { Box } from '../Box/Box';

import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/pagination';

import styles from './ImageSlider.module.scss';

import defaultImage from '../../../assets/no-image.svg';

const sx = {
  slider: {
    width: {
      md: '580px',
      xs: '100%',
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
};

const defaultImages = [{ full: defaultImage, small: defaultImage }];

export function ImageSlider({ images }: ImageSliderProps) {
  const [activeId, setActiveId] = useState(0);

  const [slider, setSlider] = useState<SwiperCore | null>(null);

  const existImages = !images.length ? defaultImages : images;

  const screenWidth = window.screen.width;

  const slideTo = (i: number) => {
    setActiveId(i);
    slider?.slideTo(i);
  };

  useEffect(() => console.log(slider?.activeIndex), [slider]);

  return (
    <Box sx={sx.slider}>
      <div className={styles.sliderWrapper}>
        <Swiper
          pagination={screenWidth < 900}
          modules={[EffectFade, Pagination]}
          effect="fade"
          onSwiper={setSlider}
          onSlideChange={swiper => slideTo(swiper.activeIndex)}
        >
          {existImages.map((image, i) => (
            <SwiperSlide key={image.full + i}>
              <Box sx={{ ...sx.slide, ...sx.full }}>
                <Image src={image.full} layout="fill" objectFit="cover" alt="" />
              </Box>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {existImages.length > 1 && (
        <Box sx={sx.scroll}>
          {existImages.map((image, i) => (
            <Box key={image.small + i} sx={{ ...sx.slide, ...sx.small, ...(activeId === i && sx.active) }}>
              <Image src={image.small} layout="fill" objectFit="cover" alt="" onClick={() => slideTo(i)} />
            </Box>
          ))}
        </Box>
      )}
    </Box>
  );
}
