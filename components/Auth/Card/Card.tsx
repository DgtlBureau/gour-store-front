import React, { ReactNode } from 'react';

import { SxProps } from '@mui/material';

import { Box } from 'components/UI/Box/Box';

const cardSx: SxProps = {
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  maxWidth: {
    xs: '100%',
    sm: '550px',
  },
  padding: {
    xs: '40px',
    sm: '60px',
  },
  backgroundColor: 'background.default',
  border: '4px solid',
  borderColor: 'accent.main',
  borderRadius: '10px',
  alignSelf: 'center',
};

type Props = {
  children: ReactNode;
};

export function AuthCard({ children }: Props) {
  return <Box sx={cardSx}>{children}</Box>;
}
