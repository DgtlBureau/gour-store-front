import { useGetCurrentUserQuery } from 'store/api/currentUserApi';
import { selectIsAuth } from 'store/selectors/auth';

import { useAppNavigation } from 'components/Navigation';
import Loader from 'components/UI/Loader/Loader';

import { useAppSelector } from 'hooks/store';

type Props = {
  children: JSX.Element;
};

export function PrivateLayout({ children }: Props): JSX.Element {
  const { isLoading, isError } = useGetCurrentUserQuery();

  if (isLoading) return <Loader width='58px' />; // TODO: show loader

  if (isError) {
    // goToIntro();
    // eslint-disable-next-line react/jsx-no-useless-fragment
    // return <></>;
  }

  return children;
}
