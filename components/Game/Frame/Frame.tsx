import React, { ReactNode } from 'react';

import { Box } from '../../UI/Box/Box';

import backgroundImage from '../../../assets/images/game/background.svg';

export type GameFrameProps = {
  children: ReactNode
};

const sx = {
  frame: {
    background: `url("${backgroundImage}")`,
    width: '1092px',
    height: '588px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '54px 141px',
    position: 'relative',
  },
};

export function GameFrame({ children }: GameFrameProps) {
  return (
    <Box sx={sx.frame}>
      {children}
    </Box>
  );
}
