import React, { ReactElement } from 'react';

import { Box } from 'components/UI/Box/Box';

import stripes from '../../assets/images/stripes.svg';
import { useSelector } from 'react-redux';
import { selectIsAuth } from 'store/selectors/auth';
import { useRouter } from 'next/router';
import { useGetCurrentUserQuery } from 'store/api/currentUserApi';

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
  const { isFetching } = useGetCurrentUserQuery();
  const isAuth = useSelector(selectIsAuth);
  const router = useRouter();

  if (isFetching) return null;

  if (isAuth) {
    router.push('/');
    return null;
  }

  return (
    <Box sx={sx.layout}>
      <Box sx={sx.container}>{children}</Box>
    </Box>
  );
}
