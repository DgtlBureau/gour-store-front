import React, { ReactElement } from 'react';

import { useAppNavigation } from 'components/Navigation';
import { Box } from 'components/UI/Box/Box';

import { selectIsAuth } from 'store/selectors/auth';
import { useGetCurrentUserQuery } from 'store/api/currentUserApi';
import { useAppSelector } from 'hooks/store';
import { ProgressLinear } from 'components/UI/ProgressLinear/ProgressLinear';

import sx from './Auth.styles';

export interface AuthLayoutProps {
  children?: ReactElement;
}

export function AuthLayout({ children }: AuthLayoutProps) {
  const { goToGame } = useAppNavigation();

  const { isLoading } = useGetCurrentUserQuery();

  const isAuth = useAppSelector(selectIsAuth);

  if (isLoading) return <ProgressLinear variant='indeterminate' />;

  if (isAuth) {
    goToGame();
    return null;
  }

  return (
    <Box sx={sx.layout}>
      <Box sx={sx.container}>{children}</Box>
    </Box>
  );
}
