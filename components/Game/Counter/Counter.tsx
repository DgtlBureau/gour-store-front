import React from 'react';
import { SxProps } from '@mui/material';

import { Typography } from '../../UI/Typography/Typography';

const counterSx: SxProps = {
  position: 'absolute',
  fontFamily: 'Coming Soon',
};

export type GameCounterProps = {
  value: number;
  sx?: SxProps;
};

export function GameCounter({ value, sx }: GameCounterProps) {
  return <Typography variant="h3" sx={{ ...counterSx, ...sx } as SxProps}>{value}</Typography>;
}
