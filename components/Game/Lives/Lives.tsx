import React from 'react';
import Image from 'next/image';
import { SxProps } from '@mui/material';

import { Box } from '../../UI/Box/Box';

import heart from '../../../assets/images/game/heart.svg';
import heartHalf from '../../../assets/images/game/heart-half.svg';
import heartEmpty from '../../../assets/images/game/heart-empty.svg';

const heartSx = {
  marginRight: '25px',

  '&:last-child': {
    marginRight: 0,
  },
}

export type GameLivesProps = {
  value: number;
  sx?: SxProps
}

export function GameLives({ value, sx }: GameLivesProps) {
  const firstHeartSrc = value >= 1 ? heart : value === 0.5 ? heartHalf : heartEmpty;
  const secondHeartSrc = value >= 2 ? heart : value === 1.5 ? heartHalf : heartEmpty;
  const thirdHeartSrc = value >= 3 ? heart : value === 2.5 ? heartHalf : heartEmpty;

  return (
    <Box sx={{ ...sx, display: 'flex', position: 'absolute', }}>
      <Box sx={heartSx}>
        <Image src={firstHeartSrc} height={39} width={43} alt="" />
      </Box>
      <Box sx={heartSx}>
        <Image src={secondHeartSrc} height={39} width={43} alt="" />
      </Box>
      <Box sx={heartSx}>
        <Image src={thirdHeartSrc} height={39} width={43} alt="" />
      </Box>
    </Box>
  );
}
