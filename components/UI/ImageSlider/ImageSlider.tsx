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
import sliderSx from './ImageSlider.styles';

import defaultImage from 'assets/no-image.svg';

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
              <Image
                loader={({ src }) => src}
                src={image.small}
                layout='fill'
                objectFit='cover'
                alt=''
                onClick={() => slideTo(i)}
              />
            </Box>
          ))}
        </Box>
      )}
    </Box>
  );
}
