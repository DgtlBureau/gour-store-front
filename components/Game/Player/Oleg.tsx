import React from 'react';
import Image from 'next/image';

import { Box } from '../../UI/Box/Box';

import handsUp from '../../../assets/images/game/player/hands-up.svg';
import handsDown from '../../../assets/images/game/player/hands-down.svg';
import body from '../../../assets/images/game/player/body.svg'

const sx = {
  oleg: {
    position: 'relative',
    height: '195px',
    width: '220px',
  },
  hands: {
    position: 'absolute',
    zIndex: 100,
  },
  handsUp: {
    top: 0,
    left: '15px',
  },
  handsDown: {
    bottom: 0,
    left: '5px',
  },
  body: {
    position: 'absolute',
    right: 0,
  },
  reflectedX: {
    transform: 'scaleX(-1)',
  },
  muted: {
    opacity: 0.15,
  },
};

export type GameOlegProps = {
  isActive: boolean;
  direction: 'left' | 'right';
  handsPosition: 'top' | 'bottom';
}

export function GameOleg({
  isActive,
  direction,
  handsPosition,
}: GameOlegProps) {
  return (
    <Box sx={{  ...sx.oleg, ...(direction === 'right' && sx.reflectedX) }}>
      <Box 
        sx={{ 
          ...sx.hands, 
          ...sx.handsUp, 
          ...((handsPosition === 'bottom' || !isActive) && sx.muted),
        }}
      >
        <Image src={handsUp} height={95} width={98} alt="" />
      </Box>

      <Box 
        sx={{ 
          ...sx.hands, 
          ...sx.handsDown, 
          ...((handsPosition === 'top' || !isActive) && sx.muted),
        }}
      >
        <Image src={handsDown} height={100} width={93} alt="" />
      </Box>

      <Box sx={{ ...sx.body, ...(!isActive && sx.muted) }}>
        <Image src={body} height={195} width={132} alt="" />
      </Box>
    </Box>
  );
}
