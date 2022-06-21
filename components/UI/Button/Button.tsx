import React, { ElementType, ReactNode } from 'react';
import MUIButton from '@mui/material/Button';
import { SxProps, Color } from '@mui/material';

import { ProgressCircular } from '../ProgressCircular/ProgressCircular';

type Props = {
  variant?: 'text' | 'outlined' | 'contained';
  children?: ReactNode;
  isLoading?: boolean;
  type?: 'button' | 'submit' | 'reset';
  size?: 'small' | 'medium' | 'large';
  color?:'primary' | 'secondary' | 'inherit' | 'error' | 'info' | 'success' | 'warning' | undefined;
  onClick?: () => void;
  disabled?: boolean;
  component?: ElementType;
  fullWidth?: boolean;
  sx?: SxProps;
  form?: string | number;
  id?: string;
};

export function Button({
  variant = 'contained',
  component = 'button',
  color = 'primary',
  isLoading,
  children,
  ...props
}: Props) {
  return (
    <MUIButton variant={variant} component={component} color={color} {...props}>
      {
        isLoading && (
          <>
            <ProgressCircular size={15} />
            &nbsp;
          </>
        )
      }
      {children}
    </MUIButton>
  );
}
