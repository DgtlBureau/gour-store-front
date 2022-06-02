import React from 'react';

import { Box } from '../../UI/Box/Box';
import { GameOleg } from './Oleg';

const sx = {
  player: {
    display: 'flex',
    justifyContent: 'space-between',
    maxWidth: '500px',
  },
};

export enum PlayerPosition {
  topLeft = 'topLeft',
  bottomLeft = 'bottomLeft',
  topRight = 'topRight',
  bottomRight = 'bottomRight',
}

export type GamePlayerProps = {
  position: PlayerPosition;
};

export function GamePlayer({ position }: GamePlayerProps) {
  const direction = [
    PlayerPosition.bottomLeft,
    PlayerPosition.topLeft,
  ].includes(position) ? 'left' : 'right';

  const handsPosition = [
    PlayerPosition.topLeft,
    PlayerPosition.topRight,
  ].includes(position) ? 'top' : 'bottom';

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
