import React, { ReactNode } from 'react';

import { Typography as MUITypography, TypographyProps as MUITypographyProps, SxProps } from '@mui/material';

export type TypographyProps = {
  color?: string;
  variant?: MUITypographyProps['variant'];
  children: ReactNode;
  sx?: SxProps;
  onClick?(): void;
};

export function Typography({ variant = 'h4', children, color, sx, onClick }: TypographyProps) {
  return (
    <MUITypography sx={sx} variant={variant} color={color} onClick={onClick}>
      {children}
    </MUITypography>
  );
}
