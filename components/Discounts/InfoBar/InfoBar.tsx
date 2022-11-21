import React, { ReactNode } from 'react';

import { Paper } from '@mui/material';

type Props = { children: ReactNode };

const paperSx = {
  marginBottom: '10px',
  boxShadow: 'none',
  padding: '16px',
};

export function DiscountsInfoBar({ children }: Props) {
  return <Paper sx={paperSx}>{children}</Paper>;
}
