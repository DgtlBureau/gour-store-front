import React from 'react';

import { SxProps } from '@mui/material';

import { Typography } from 'components/UI/Typography/Typography';

const counterSx: SxProps = {
  position: 'absolute',
  fontFamily: 'Coming Soon',
};

export type GameCounterProps = {
  value: number;
  sx?: SxProps;
};

export function GameCounter({ value, sx }: GameCounterProps) {
  const getCount = () => {
    if (!value) return '0000';
    if (value < 9) return `000${value}`;
    if (value < 100) return `00${value}`;
    if (value < 1000) return `0${value}`;
    return value;
  };

  return (
    <Typography variant='h3' sx={{ ...counterSx, ...sx } as SxProps}>
      {getCount()}
    </Typography>
  );
}
