/* eslint-disable react/no-array-index-key */
import Image from 'next/image';
import React, { useState } from 'react';

import { SxProps } from '@mui/material';
import SwiperCore, { EffectFade, Pagination } from 'swiper';
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from 'swiper/react';

import { Box } from '../Box/Box';

import styles from './ImageSlider.module.scss';
import sliderSx from './ImageSlider.styles';

import defaultImage from 'assets/images/default.svg';

export type ImageSliderProps = {
  images: {
    small: string;
    full: string;
  }[];
  backgroundSrc?: string;
  sx?: SxProps;
};

const defaultImages = [{ full: defaultImage, small: defaultImage }];

export function ImageSlider({ images, backgroundSrc, sx }: ImageSliderProps) {
  const [activeId, setActiveId] = useState(0);

  const [slider, setSlider] = useState<SwiperCore | null>(null);

  const existImages = !images.length ? defaultImages : images;

  const screenWidth = window.screen.width;

  const backgroundImage = `url('${backgroundSrc}')`;

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
              <Box sx={{ ...sliderSx.slide, ...sliderSx.full, backgroundImage }}>
                <Image src={image.full} layout='fill' className={styles.img} objectFit='contain' alt='' />
              </Box>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {existImages.length > 1 && (
        <Box sx={sliderSx.scroll}>
          111
          {existImages.map((image, i) => (
            <Box
              key={i}
              sx={{ ...sliderSx.slide, ...sliderSx.small, ...(activeId === i && sliderSx.active), backgroundImage }}
            >
              <Image
                loader={({ src }) => src}
                src={image?.small}
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
