import React, { ElementType, ReactNode } from 'react';
import MUIIconButton from '@mui/material/IconButton';
import { SxProps } from '@mui/material';

type Props = {
  sx?: SxProps;
  size?: 'small' | 'medium' | 'large' | undefined;
  children: ReactNode;
  type?: 'button' | 'submit' | 'reset';
  onClick?: () => void;
  disabled?: boolean;
  color?:
    | 'inherit'
    | 'default'
    | 'primary'
    | 'secondary'
    | 'error'
    | 'info'
    | 'success'
    | 'warning'
    | undefined;
  sx?: SxProps;
  component?: ElementType;
};

export function IconButton({
  sx,
  size,
  children,
  color,
  onClick,
  type,
  disabled,
  component = 'button',
  sx,
}: Props) {
  return (
    <MUIIconButton
      size={size}
      disabled={disabled}
      color={color}
      onClick={onClick}
      type={type}
      component={component}
      sx={sx}
    >
      {children}
    </MUIIconButton>
  );
}
