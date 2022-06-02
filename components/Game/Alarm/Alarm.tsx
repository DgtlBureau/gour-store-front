import React from 'react';
import Image from 'next/image';
import { keyframes } from '@emotion/react';

import { Box } from '../../UI/Box/Box';

import handUp from '../../../assets/images/game/rabbit/hand-up.svg';
import handDown from '../../../assets/images/game/rabbit/hand-down.svg';
import body from '../../../assets/images/game/rabbit/body.svg';

const fade = keyframes`
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
  100% {
    opacity: 1;
  }
`;

const shine = keyframes`
  0% {
    opacity: 0.5;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0.5;
  }
`;

const sx = {
  rabbit: {
    position: 'relative',
    height: '120px',
    width: '90px',
  },
  hand: {
    position: 'absolute',
    right: 0,
    zIndex: 100,
  },
  upHand: {
    top: '40px',
    right: '-55px',
  },
  downHand: {
    right: '-30px',
    bottom: '-40px',
  },
  muted: {
    opacity: 0.5,
  },
  upHandAnimation: {
    animation: `${shine} step-end 2s infinite`,
  },
  downHandAnimation: {
    animation: `${fade} step-end 2s infinite`,
  }
};

export type GameAlarmProps = {
  isRinging: boolean;
};

export function GameAlarm({ isRinging }: GameAlarmProps) {
  return (
    <Box sx={{ ...sx.rabbit, ...(!isRinging && sx.muted) }}>
      <Image src={body} height={120} width={90} alt="" />
      <Box sx={{ ...sx.hand, ...sx.upHand, ...(isRinging && sx.upHandAnimation) }}>
        <Image src={handUp} height={56} width={55} alt="" />
      </Box>
      <Box sx={{ ...sx.hand, ...sx.downHand, ...(isRinging && sx.downHandAnimation) }}>
        <Image src={handDown} height={70} width={44} alt="" />
      </Box>
    </Box>
  );
}