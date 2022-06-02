import React from 'react';

import { Box } from '../../UI/Box/Box';
import { GameOleg } from './Oleg';

const sx = {
  player: {
    display: 'flex',
    justifyContent: 'space-between',
    maxWidth: '500px',
    zIndex: 50,
  },
};

export type GameFieldPosition = 'topLeft' | 'bottomLeft' | 'topRight' | 'bottomRight';

export type GamePlayerProps = {
  position: GameFieldPosition;
};

export function GamePlayer({ position }: GamePlayerProps) {
  const direction = ['topLeft', 'bottomLeft'].includes(position) ? 'left' : 'right';

  const handsPosition = ['topLeft', 'topRight'].includes(position) ? 'top' : 'bottom';

  return (
    <Box sx={sx.player}>
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
