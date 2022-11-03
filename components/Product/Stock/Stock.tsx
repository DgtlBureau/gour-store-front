import React from 'react';

import { SxProps } from '@mui/material';

import { Typography } from 'components/UI/Typography/Typography';

import stockSx from './Stock.styles';

type ProductStockProps = {
  label: string;
  fullWidth?: boolean;
  multiLine?: boolean;
  sx?: SxProps;
};

export function ProductStock({ label, fullWidth, multiLine, sx }: ProductStockProps) {
  const width = fullWidth ? '100%' : 'fit-content';

  return (
    <Typography
      variant='body2'
      sx={{ ...stockSx.stock, width, ...(!multiLine && stockSx.singleLine), ...sx } as SxProps}
    >
      {label}
    </Typography>
  );
}
