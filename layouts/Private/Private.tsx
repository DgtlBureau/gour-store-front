import { PropsWithChildren } from 'react';

import { useAppSelector } from 'hooks/store';
import { useGetCurrentUserQuery } from 'store/api/currentUserApi';
import { selectIsAuth } from 'store/selectors/auth';
import { useAppNavigation } from 'components/Navigation';

export type PrivateLayoutProps = PropsWithChildren<{}>;

export function PrivateLayout({ children }: PrivateLayoutProps) {
  const { isLoading, isError } = useGetCurrentUserQuery();
  const { goToIntro } = useAppNavigation();
  const isAuth = useAppSelector(selectIsAuth);

  if (isLoading) return null;
  if (isError || !isAuth) {
    goToIntro();
    return null;
  }
  return <>{children}</>;
}
