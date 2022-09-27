import { ReactNode } from 'react';

import { useAppSelector } from 'hooks/store';
import { useGetCurrentUserQuery } from 'store/api/currentUserApi';
import { selectIsAuth } from 'store/selectors/auth';
import { useAppNavigation } from 'components/Navigation';

type Props = {
  children: any;
};

export function PrivateLayout({ children }: Props) {
  const { isLoading, isError } = useGetCurrentUserQuery();
  const { goToIntro, goToGame } = useAppNavigation();

  const isAuth = useAppSelector(selectIsAuth);
  if (isLoading) return null; // TODO: show loader

  if (isError || !isAuth) {
    goToIntro();
    return null;
  }

  return children;
}
