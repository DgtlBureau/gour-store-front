import React, { ReactElement } from 'react';

import { Box } from 'components/UI/Box/Box';
import stripes from '../../assets/images/stripes.svg';

const sx = {
  layout: {
    padding: {
      xs: '100px 0 0 0',
    },
    height: {
      md: '100vh',
    },
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundImage: 'url(' + `${stripes}` + ')',
    backgroundRepeat: 'repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'top center',
  },
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    maxWidth: '1200px',
    width: 'calc(100% - 20px)',
  },
};

export interface AuthLayoutProps {
  children?: ReactElement;
}

export function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <Box sx={sx.layout}>
      <Box sx={sx.container}>{children}</Box>
    </Box>
  );
}
