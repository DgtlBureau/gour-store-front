import React, { ElementType, ReactNode } from 'react';
import MUIButton from '@mui/material/Button';
import { SxProps } from '@mui/material';

import { ProgressCircular } from '../ProgressCircular/ProgressCircular';

type Props = {
  variant?: 'text' | 'outlined' | 'contained';
  children: ReactNode;
  isLoading?: boolean;
  type?: 'button' | 'submit' | 'reset';
  size?: 'small' | 'medium' | 'large';
  onClick?: () => void;
  disabled?: boolean;
  component?: ElementType;
  color?: string;
  fullWidth?: boolean;
  sx?: SxProps;
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
