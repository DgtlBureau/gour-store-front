import React from 'react';
import Image from 'next/image';

import { Box } from '../../UI/Box/Box';

import handsUp from '../../../assets/game/player/hands-up.svg';
import handsDown from '../../../assets/game/player/hands-down.svg';
import body from '../../../assets/game/player/body.svg'

const sx = {
  player: {
    display: 'flex',
    justifyContent: 'space-between',
    maxWidth: '500px',
  },
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
    opacity: 0.5,
  },
};

export enum PlayerPosition {
  topLeft = 'topLeft',
  bottomLeft = 'bottomLeft',
  topRight = 'topRight',
  bottomRight = 'bottomRight',
}

export type GameOlegProps = {
  position: PlayerPosition;
};

export function GameOleg({ position }: GameOlegProps) {
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
      {
        ['left', 'right'].map(it => (
          <Box key={it} sx={{  ...sx.oleg, ...(it === 'right' && sx.reflectedX) }}>
            <Box 
              sx={{ 
                ...sx.hands, 
                ...sx.handsUp, 
                ...((handsPosition === 'bottom' || direction !== it) && sx.muted),
              }}
            >
              <Image src={handsUp} height={95} width={98} alt="" />
            </Box>

            <Box 
              sx={{ 
                ...sx.hands, 
                ...sx.handsDown, 
                ...((handsPosition === 'top' || direction !== it) && sx.muted),
              }}
            >
              <Image src={handsDown} height={100} width={93} alt="" />
            </Box>

            <Box sx={{ ...sx.body, ...(direction !== it && sx.muted) }}>
              <Image src={body} height={195} width={132} alt="" />
            </Box>
          </Box>
        ))
      }
    </Box>
  );
}
