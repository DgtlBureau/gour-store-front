import React, { ReactElement } from 'react';

import { Box } from 'components/UI/Box/Box';
import { useSelector } from 'react-redux';
import { selectIsAuth } from 'store/selectors/auth';
import { useRouter } from 'next/router';
import { useGetCurrentUserQuery } from 'store/api/authApi';

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
  const { isFetching } = useGetCurrentUserQuery();
  const isAuth = useSelector(selectIsAuth);
  const router = useRouter();

  if (isFetching) return null;

  if (isAuth) {
    router.push('/');
    return null;
  }

  return <Box sx={sx.layout}>{children}</Box>;
}
