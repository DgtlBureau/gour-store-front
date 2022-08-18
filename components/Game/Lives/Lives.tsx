import React from 'react';
import Image from 'next/image';
import { SxProps } from '@mui/material';

import { Box } from 'components/UI/Box/Box';

import heart from 'assets/images/game/heart.svg';
import heartHalf from 'assets/images/game/heart-half.svg';
import heartEmpty from 'assets/images/game/heart-empty.svg';

const heartSx = {
  marginRight: '25px',

  '&:last-child': {
    marginRight: 0,
  },
};

export type GameLivesProps = {
  value: number;
  sx?: SxProps;
};

const computeFirstHeartSrc = (value: number, fullHP: number, halfHP: number) => {
  if (value >= fullHP) return heart;
  if (value === halfHP) return heartHalf;
  return heartEmpty;
};

export function GameLives({ value, sx }: GameLivesProps) {
  const firstHeartSrc = computeFirstHeartSrc(value, 1, 0.5);
  const secondHeartSrc = computeFirstHeartSrc(value, 2, 1.5);
  const thirdHeartSrc = computeFirstHeartSrc(value, 3, 2.5);

  return (
    <Box sx={{ ...sx, display: 'flex', position: 'absolute' }}>
      <Box sx={heartSx}>
        <Image src={firstHeartSrc} height={39} width={43} alt='' />
      </Box>
      <Box sx={heartSx}>
        <Image src={secondHeartSrc} height={39} width={43} alt='' />
      </Box>
      <Box sx={heartSx}>
        <Image src={thirdHeartSrc} height={39} width={43} alt='' />
      </Box>
    </Box>
  );
}
