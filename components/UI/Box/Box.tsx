import React, { ElementType, ReactNode } from 'react';

import { SxProps } from '@mui/material';
import MUIBox from '@mui/material/Box';

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
