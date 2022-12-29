import React, { ElementType, ReactNode } from 'react';

import { Typography as MUITypography, TypographyProps as MUITypographyProps, SxProps } from '@mui/material';

export type TypographyProps = {
  color?: string;
  variant?: MUITypographyProps['variant'];
  children: ReactNode;
  component?: ElementType;
  sx?: SxProps;
  onClick?(): void;
};

export function Typography({ variant = 'h4', children, color, component = 'p', sx, onClick }: TypographyProps) {
  return (
    <MUITypography component={component} sx={sx} variant={variant} color={color} onClick={onClick}>
      {children}
    </MUITypography>
  );
}
