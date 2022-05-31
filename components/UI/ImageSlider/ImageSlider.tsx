/* eslint-disable import/no-unresolved */
import React, { useState } from 'react';
import SwiperCore, { EffectFade } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import Image from 'next/image';

import { Box } from '../Box/Box';

import 'swiper/css';
import 'swiper/css/effect-fade';

import defaultImage from '../../../assets/no-image.svg';

const sx = {
  slider: {
    width: '100%',
    marginLeft: 0,
    marginRight: 0,
    '@media (min-width: 995px)': {
      maxWidth: '580px',
    },
  },
  scroll: {
    display: 'flex',
    overflow: 'scroll',
    padding: '7px 0',
  },
  small: {
    cursor: 'pointer',
    marginRight: '14px',
    '&:last-child': {
      marginRight: 0,
    },
  }
};

export type ImageSliderProps = {
  images: {
    small: string;
    full: string;
  }[];
};

const defaultImages = [{ full: defaultImage, small: defaultImage}];

export function ImageSlider({images}: ImageSliderProps) {
  const [slider, setSlider] = useState<SwiperCore | null>(null);
  const slideTo = (i: number) => slider?.slideTo(i);
  const checkImages = () => {
    if (!images.length) {
      return defaultImages
    }
    return images
  }

  return (
    <Box sx={sx.slider}>
      <Swiper
        modules={[EffectFade]}
        effect="fade"
        onSwiper={setSlider}
      >
        {
          checkImages().map((image, i) => (
            <SwiperSlide key={image.full + i}>
              <Image src={image.full} objectFit="contain" height={500} width={580} alt=""/>
            </SwiperSlide>
          ))
        }
      </Swiper>

      <Box sx={sx.scroll}>
        {
          checkImages().map((image, i) => (
            <Box key={image.small + i} sx={sx.small}>
              <Image src={image.small} objectFit="contain" height={80} width={90} alt="" onClick={() => slideTo(i)}/>
            </Box>
          ))
        }
      </Box>
    </Box>
  );
}
