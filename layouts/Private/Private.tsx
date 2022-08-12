import { PropsWithChildren } from 'react';
import { useSelector } from 'react-redux';

import { useGetCurrentUserQuery } from 'store/api/currentUserApi';
import { selectIsAuth } from 'store/selectors/auth';
import { useAppNavigation } from 'components/Navigation';

export type PrivateLayoutProps = PropsWithChildren<{}>;

export function PrivateLayout({ children }: PrivateLayoutProps) {
  const { isLoading, isError } = useGetCurrentUserQuery();
  const { goToIntro } = useAppNavigation();
  const isAuth = useSelector(selectIsAuth);

  if (isLoading) return null;
  if (isError || !isAuth) {
    goToIntro();
    return null;
  }
  return <>{children}</>;
}
