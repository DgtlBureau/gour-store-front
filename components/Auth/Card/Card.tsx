import React, { ReactNode } from 'react';
import { SxProps } from '@mui/material';

import { Box } from '../../UI/Box/Box';

const cardSx: SxProps = {
  display: 'flex',
  flexDirection: 'column',
  padding: {
    xs: '40px',
    sm: '60px',
  },
  backgroundColor: 'background.default',
  border: '4px solid',
  borderColor: 'accent.main',
  borderRadius: '10px',
};

type Props = {
  children: ReactNode;
};

export function AuthCard({ children }: Props) {
  return <Box sx={cardSx}>{children}</Box>;
}
