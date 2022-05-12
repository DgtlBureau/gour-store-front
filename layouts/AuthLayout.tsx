import React, { ReactElement } from 'react';

import { Box } from 'components/UI/Box/Box';

const sx = {
  layout: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
  },
};

export interface AuthLayoutProps {
  children?: ReactElement;
}

export function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <Box sx={sx.layout}>
      {children}
    </Box>
  );
}
