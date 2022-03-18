import React, { ElementType, ReactNode } from 'react';
import MUIIconButton from '@mui/material/IconButton';
import { SxProps } from '@mui/material';

type Props = {
  size?: 'small' | 'medium' | 'large' | undefined;
  children: ReactNode;
  type?: 'button' | 'submit' | 'reset';
  onClick?: () => void;
  disabled?: boolean;
  sx?: SxProps;
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

  component: ElementType;
};

export function IconButton({
  size,
  children,
  color,
  onClick,
  type,
  disabled,
  component,
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
