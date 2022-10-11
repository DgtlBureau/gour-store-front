import { useRouter } from 'next/router';
import React from 'react';

import { useGetPageQuery } from 'store/api/pageApi';

import { PrivateLayout } from 'layouts/Private/Private';
import { ShopLayout } from 'layouts/Shop/Shop';

import { useAppNavigation } from 'components/Navigation';
import { PageContent } from 'components/PageContent/PageContent';
import { Button } from 'components/UI/Button/Button';
import Loader from 'components/UI/Loader/Loader';

import NotFound from './404';
import sx from './Page.styles';

function InfoPages() {
  const {
    goToHome,
    language,
    currency,
    query: { key: pageKey },
  } = useAppNavigation();

  if (!pageKey) return <NotFound />;

  const formattedPageKey = pageKey?.toString().toUpperCase() || '';
  // if (!formattedPageKey) goToHome();

  const { data: page, isLoading, isError } = useGetPageQuery(formattedPageKey);

  if (!isLoading && !page) return <NotFound />;

  return (
    <PrivateLayout>
      <ShopLayout currency={currency} language={language}>
        <PageContent title={page?.info.title[language]} description={page?.info.description[language]} />
        <Button sx={sx.button} onClick={goToHome}>
          вернуться на главную
        </Button>
      </ShopLayout>
    </PrivateLayout>
  );
}

export default InfoPages;
