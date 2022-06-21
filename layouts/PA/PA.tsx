import React, { ReactNode, useState } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';

import { selectedProductCount, selectedProductSum } from '../../store/slices/orderSlice';
import translations from './PA.i18n.json';
import { useLocalTranslation } from '../../hooks/useLocalTranslation';
import { useGetCityListQuery } from '../../store/api/cityApi';
import { useGetCurrentUserQuery } from '../../store/api/currentUserApi';
import { Box } from '../../components/UI/Box/Box';
import { Header } from '../../components/Header/Header';
import { PAMenu } from '../../components/PA/Menu/Menu';
import { LocalConfig } from '../../hooks/useLocalTranslation';
import { Path } from '../../constants/routes';
import { contacts } from '../../constants/contacts';
import { Currency } from '../../@types/entities/Currency';

import sx from './PA.styles';

export interface PALayoutProps {
  children?: ReactNode;
}

export function PALayout({ children }: PALayoutProps) {
  const router = useRouter();

  const language: keyof LocalConfig = (router?.locale as keyof LocalConfig) || 'ru';
  const currency: Currency = 'cheeseCoin';

  const { data: cities } = useGetCityListQuery();
  const { data: currentUser } = useGetCurrentUserQuery();

  const { t } = useLocalTranslation(translations);

  const currentPath = router.pathname.split('/')[2];

  const [chapter, setChapter] = useState<string>(currentPath);

  const convertedCities =
    cities?.map(city => ({
      id: city.id,
      name: city.name[language],
    })) || [];

  const count = useSelector(selectedProductCount);
  const sum = useSelector(selectedProductSum);

  const selectedCity = cities?.find(city => city.id === currentUser?.cityId) || cities?.[0];

  const menuList = [
    {
      label: t('main'),
      path: `${Path.MAIN}`,
    },
    {
      label: t('orders'),
      path: `${Path.ORDERS}`,
    },
    {
      label: t('credentials'),
      path: `${Path.CREDENTIALS}`,
    },
    {
      label: t('addresses'),
      path: `${Path.ADDRESSES}`,
    },
    {
      label: t('discounts'),
      path: `${Path.DISCOUNTS}`,
    },
  ];

  const goToFavorites = () => router.push('/favorites');
  const goToBasket = () => router.push('/basket');
  const goToPersonalArea = () => router.push('/personal-area');
  const goToReplenishment = () => router.push('/replenishment');

  // TO DO
  const changeCity = (id: number) => ({});

  const changeChapter = (path: string) => {
    setChapter(path);
    router.push(path);
  };

  return (
    <Box sx={sx.layout}>
      <Header
        {...contacts}
        selectedCityId={selectedCity?.id || 0}
        cities={convertedCities}
        currency={currency}
        language={language}
        basketProductCount={count}
        basketProductSum={sum}
        moneyAmount={1000}
        onChangeCity={changeCity}
        onClickFavorite={goToFavorites}
        onClickPersonalArea={goToPersonalArea}
        onClickBasket={goToBasket}
        onClickReplenishment={goToReplenishment}
        onClickSignout={() => ({})}
      />

      <Box sx={sx.content}>
        <PAMenu active={chapter} menuList={menuList} onChange={changeChapter} />
        {children}
      </Box>
    </Box>
  );
}
