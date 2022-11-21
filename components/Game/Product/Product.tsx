import Image from 'next/image';
import React from 'react';

import { SxProps } from '@mui/material';

import { Box } from 'components/UI/Box/Box';

import cheese from 'assets/images/game/cheese.svg';
import chicken from 'assets/images/game/chicken.svg';
import jamon from 'assets/images/game/jamon.svg';
import sausage from 'assets/images/game/sausage.svg';

const productSx = {
  position: 'absolute',
};

const mutedSx = {
  opacity: 0.15,
};

export type GameProductType = 'cheese' | 'sausage' | 'jamon' | 'chicken';

export type GameProductProps = {
  isActive: boolean;
  type: GameProductType;
  angle: number;
  sx?: SxProps;
};

export function GameProduct({ isActive, type, angle, sx }: GameProductProps) {
  const images = {
    cheese: <Image src={cheese} height={47} width={48} alt='' />,
    sausage: <Image src={sausage} height={33} width={55} alt='' />,
    jamon: <Image src={jamon} height={88} width={61} alt='' />,
    chicken: <Image src={chicken} height={53} width={49} alt='' />,
  };

  return (
    <Box
      sx={
        {
          ...productSx,
          ...(!isActive && mutedSx),
          transform: `rotate(${angle}deg)`,
          ...sx,
        } as SxProps
      }
    >
      {images[type]}
    </Box>
  );
}
