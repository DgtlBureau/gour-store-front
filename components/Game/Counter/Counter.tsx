import React from 'react';
import { Typography } from '../../UI/Typography/Typography';

const counterSx = {
  fontFamily: 'Coming Soon',
};

export type GameCounterProps = {
  value: number;
};

export function GameCounter({ value }: GameCounterProps) {
  return <Typography variant="h3" sx={counterSx}>{value}</Typography>;
}
