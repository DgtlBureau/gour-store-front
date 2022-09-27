import React, { ReactNode, ElementType } from 'react';
import MUIBox from '@mui/material/Box';
import { SxProps } from '@mui/material';

type Props = {
  children: ReactNode;
  component?: ElementType;
  sx?: SxProps;
  id?: string;
  onClick?: () => void;
};

export function Box({ children, sx, component, id, onClick }: Props) {
  return (
    <MUIBox id={id} sx={sx} component={component} onClick={onClick}>
      {children}
    </MUIBox>
  );
}
