import React, { ReactNode } from 'react';
import { Link as MUILink, SxProps } from '@mui/material';

import { defaultTheme } from '../../../themes';

type Props = {
  children: ReactNode;
  path?: string;
  underline?: 'none' | 'hover' | 'always';
  className?: string;
  color?: string;
  sx?: SxProps;
  variant?: 
    "button" | 
    "caption" | 
    "h1" | 
    "h2" | 
    "h3" | 
    "h4" | 
    "h5" | 
    "h6" | 
    "inherit" | 
    "body1" | 
    "overline" | 
    "subtitle1" | 
    "subtitle2" | 
    "body2" | 
    undefined;
}

export function Link(props: Props) {
  const { children, path, underline = 'always', className, variant, color, sx } = props;

  return (
    <MUILink
      href={path || '#'}
      underline={underline}
      className={className}
      variant={variant}
      color={color || defaultTheme.palette.accent.main}
      sx={sx}
    >
      {children}
    </MUILink>

  );
}
