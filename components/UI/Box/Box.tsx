import React, { ReactNode, ElementType } from 'react';
import MUIBox from '@mui/material/Box';
import { SxProps } from '@mui/material';

type Props = {
  children: ReactNode;
  component?: ElementType;
  sx?: SxProps;
  onClick?: () => void;
};

export function Box({ children, sx, component, onClick }: Props) {
  return (
    <MUIBox sx={sx} component={component} onClick={onClick}>
      {children}
    </MUIBox>
  );
}
