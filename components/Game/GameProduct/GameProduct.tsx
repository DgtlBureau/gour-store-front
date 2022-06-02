import React from 'react';
import Image from 'next/image';

import { Box } from '../../UI/Box/Box';

import cheese from '../../../assets/images/game/cheese.svg';
import chicken from '../../../assets/images/game/chicken.svg';
import sausage from '../../../assets/images/game/sausage.svg';
import jamon from '../../../assets/images/game/jamon.svg';

const sx = {
  product: {
    transition: 'all 0.5s ease',
    height: 'fit-content',
    width: 'fit-content',
  },
  muted: {
    opacity: 0.5,
  },
};

type GameProductType = 'cheese' | 'sausage' | 'jamon' | 'chicken';

export type GameProductProps = {
  isActive: boolean;
  type: GameProductType;
  step: 1 | 2 | 3 | 4;
};

const items = {
  cheese,
  sausage,
  jamon,
  chicken,
};

const stepAngles = {
  1: 0,
  2: 60,
  3: 120,
  4: 180,
}

export function GameProduct({ isActive, type, step }: GameProductProps) {
  return (
    <Box 
      sx={{ 
        ...sx.product, 
        ...(!isActive && sx.muted), 
        transform: `rotate(${stepAngles[step]}deg)`,
      }}
    >
      <Image src={items[type]} width="100%" height="100%" alt="" />
    </Box>
  );
}
