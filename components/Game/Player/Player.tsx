import React from 'react';
import { SxProps } from '@mui/material';

import { Box } from '../../UI/Box/Box';
import { GameOleg } from './Oleg';

const playerSx = {
  position: 'absolute',
  display: 'flex',
  justifyContent: 'space-between',
  width: '490px',
  zIndex: 50,
};

export type GameFieldPosition = 'topLeft' | 'bottomLeft' | 'topRight' | 'bottomRight' | 'basic';

export type GamePlayerProps = {
  position: GameFieldPosition;
  sx?: SxProps;
};

export function GamePlayer({ position = 'basic', sx }: GamePlayerProps) {
  const isBasic = position === 'basic';
  const isLeft = ['topLeft', 'bottomLeft'].includes(position);
  const handsPosition = ['topLeft', 'topRight'].includes(position) ? 'top' : 'bottom';

  return (
    <Box sx={{ ...playerSx, ...sx } as SxProps}>
      <GameOleg isActive={!isBasic && isLeft} direction='left' handsPosition={handsPosition} />
      <GameOleg isActive={!isBasic && !isLeft} direction='right' handsPosition={handsPosition} />
    </Box>
  );
}
