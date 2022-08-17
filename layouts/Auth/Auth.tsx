import React, { ReactElement } from 'react';

import { useAppNavigation } from 'components/Navigation';
import { Box } from 'components/UI/Box/Box';

import { selectIsAuth } from 'store/selectors/auth';
import { useGetCurrentUserQuery } from 'store/api/currentUserApi';
import { useAppSelector } from 'hooks/store';
import stripes from '../../assets/images/stripes.svg';

const sx = {
  layout: {
    padding: {
      xs: '100px 0 0 0',
    },
    minHeight: {
      md: '100vh',
    },
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundImage: `url(${stripes})`,
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
  const { goToHome } = useAppNavigation();
  const { isFetching } = useGetCurrentUserQuery();
  const isAuth = useAppSelector(selectIsAuth);

  if (isFetching) return null;

  if (isAuth) {
    goToHome();
    return null;
  }

  return (
    <Box sx={sx.layout}>
      <Box sx={sx.container}>{children}</Box>
    </Box>
  );
}
