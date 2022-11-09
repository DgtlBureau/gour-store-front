import React from 'react';

import { useGetPageQuery } from 'store/api/pageApi';
import { selectIsAuth } from 'store/selectors/auth';

import { ShopLayout } from 'layouts/Shop/Shop';

import { useAppNavigation } from 'components/Navigation';
import { PageContent } from 'components/PageContent/PageContent';
import { Button } from 'components/UI/Button/Button';
import Loader from 'components/UI/Loader/Loader';

import { useAppSelector } from 'hooks/store';

import NotFound from './404';

import { sx } from './Page.styles';

function InfoPages() {
  const {
    goToHome,
    goToIntro,
    language,
    query: { key: pageKey },
  } = useAppNavigation();
  // upper case из-за особенностей api
  const formattedPageKey = String(pageKey) || '';

  const { data: page, isLoading } = useGetPageQuery(formattedPageKey);

  const isAuth = useAppSelector(selectIsAuth);

  if ((!isLoading && !page) || !formattedPageKey) return <NotFound />;

  return (
    <ShopLayout>
      {isLoading && <Loader />}

      {!isLoading && !!page && (
        <>
          <PageContent title={page.info.title[language]} description={page.info.description[language]} />

          {isAuth ? (
            <Button sx={sx.button} onClick={goToHome}>
              вернуться на главную
            </Button>
          ) : (
            <Button sx={sx.button} onClick={goToIntro}>
              вернуться на авторизацию
            </Button>
          )}
        </>
      )}
    </ShopLayout>
  );
}

export default InfoPages;
