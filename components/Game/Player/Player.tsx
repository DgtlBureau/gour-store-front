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

export type GameFieldPosition = 'topLeft' | 'bottomLeft' | 'topRight' | 'bottomRight';

export type GamePlayerProps = {
  position: GameFieldPosition;
  sx?: SxProps;
};

export function GamePlayer({ position, sx }: GamePlayerProps) {
  const direction = ['topLeft', 'bottomLeft'].includes(position) ? 'left' : 'right';

  const handsPosition = ['topLeft', 'topRight'].includes(position) ? 'top' : 'bottom';

  return (
    <Box sx={{ ...playerSx, ...sx } as SxProps}>
      <GameOleg
        isActive={direction === 'left'}
        direction="left"
        handsPosition={handsPosition}
      />
      <GameOleg
        isActive={direction === 'right'}
        direction="right"
        handsPosition={handsPosition}
      />
    </Box>
  );
}
