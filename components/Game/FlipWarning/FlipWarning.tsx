import React from 'react';
import Image from 'next/image';
import { SxProps } from '@mui/material';

import { Box } from '../../UI/Box/Box';
import { Typography } from '../../UI/Typography/Typography';

import screenFlip from '../../../assets/images/game/screen-flip.svg';

const warningSx = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    maxWidth: '280px',
    alignItems: 'center',
  },
  title: {
    marginTop: '24px',
    fontWeight: 'bold',
  },
  text: {
    textAlign: 'center',
  },
};

type Props = {
  sx?: SxProps;
};

export function GameFlipWarning({ sx }: Props) {
  return (
    <Box sx={{ ...warningSx.container, ...sx } as SxProps}>
      <Image src={screenFlip} height={60} width={60} alt="" />

      <Typography variant="h6" sx={{ ...warningSx.text, ...warningSx.title }}>
        Чтобы сыграть в игру, поверните устройство
      </Typography>

      <Typography variant="body1" sx={warningSx.text}>
        Игра работает только в горизонтальной ориентации
      </Typography>
    </Box>
  );
}
