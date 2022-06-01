import React from 'react';
import Image from 'next/image';

import { Box } from '../../UI/Box/Box';

import handsUp from '../../../assets/game/player/hands-up.svg';
import handsDown from '../../../assets/game/player/hands-down.svg';
import body from '../../../assets/game/player/body.svg'

const sx = {
  oleg: {
    position: 'relative',
    height: '195px',
    width: '210px',
  },
  hands: {
    position: 'absolute',
    zIndex: 100,
  },
  raised: {
    top: 0
  },
  omitted: {
    bottom: 0,
  },
  body: {
    position: 'absolute',
    right: 0,
  },
  reflectedX: {
    transform: 'scaleX(-1)',
  },
};

export enum PlayerPosition {
  topLeft = 'topLeft',
  topRight = 'topRight',
  bottomLeft = 'bottomLeft',
  bottomRight = 'bottomRight',
}

export type GameOlegProps = {
  position: PlayerPosition;
};

export function GameOleg({ position }: GameOlegProps) {
  const isTop = [PlayerPosition.topRight, PlayerPosition.topLeft].includes(position);
  const isRight = [PlayerPosition.topRight, PlayerPosition.bottomRight].includes(position);

  return (
    <Box sx={{ ...sx.oleg, ...(isRight && sx.reflectedX)}}>
      <Box sx={{ ...sx.hands, ...(isTop ? sx.raised : sx.omitted) }}>
        {
          isTop ? (
            <Image src={handsUp} height={95} width={99} alt="" />
          ) : (
            <Image src={handsDown} height={100} width={93} alt="" />
          )
        }
      </Box>
      <Box sx={sx.body}>
        <Image src={body} height={195} width={132} alt="" />
      </Box>
    </Box>
  );
}
