import { useRouter } from 'next/router';
import { PropsWithChildren } from 'react';
import { useSelector } from 'react-redux';
import { useGetCurrentUserQuery } from 'store/api/currentUserApi';
import { selectIsAuth } from 'store/selectors/auth';

export type PrivateLayoutProps = PropsWithChildren<{}>;

export function PrivateLayout({ children }: PrivateLayoutProps) {
  const { isLoading, isError } = useGetCurrentUserQuery();
  const router = useRouter();
  const isAuth = useSelector(selectIsAuth);

  if (isLoading) return null;
  if (isError || !isAuth) {
    router.push('/auth');
    return null;
  }
  return <>{children}</>;
}
