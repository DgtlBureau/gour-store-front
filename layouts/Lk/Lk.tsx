import React, { ReactNode, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';

import {
  selectedProductCount,
  selectedProductSum,
} from '../../store/slices/orderSlice';
import translations from './Lk.i18n.json';
import { useLocalTranslation } from '../../hooks/useLocalTranslation';
import { useGetCityListQuery } from '../../store/api/cityApi';
import { useGetCurrentUserQuery } from '../../store/api/currentUserApi';
import { Box } from '../../components/UI/Box/Box';
import { Header } from '../../components/Header/Header';
import { LkMenu } from 'components/UI/LkMenu/LkMenu';
import { LocalConfig } from '../../hooks/useLocalTranslation';
import { Path } from '../../constants/routes';

import sx from './Lk.styles';

export interface LkLayoutProps {
  children?: ReactNode;
}

export function LkLayout(props: LkLayoutProps) {
  const router = useRouter();

  const locale: keyof LocalConfig = (router?.locale as keyof LocalConfig) || 'ru';
  const currentCurrency = locale === 'ru' ? 'rub' : 'eur';

  const { data: cities } = useGetCityListQuery();
  const { data: currentUser } = useGetCurrentUserQuery();

  const { t } = useLocalTranslation(translations);

  const currentPath = router.pathname.split('/')[2];

  const [chapter, setChapter] = useState<string>(currentPath);

  const convertedCities = cities?.map(city => (
    {
      id: city.id,
      name: city.name[locale],
    }
  )) || [];

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

  // TO DO
  const changeCity = (id: number) => ({});

  const changeChapter = (path: string) => {
    setChapter(path);
    router.push(path);
  };

  return (
    <Box sx={sx.layout}>
      <Header
        isMobile={false}
        phone="+7 812 602-52-61"
        selectedCity={selectedCity?.name[locale] || ''}
        cities={convertedCities}
        selectedLanguage={locale}
        basketProductCount={count}
        basketProductSum={sum}
        currency={currentCurrency}
        onChangeCity={changeCity}
        onClickFavorite={goToFavorites}
        onClickPersonalArea={goToPersonalArea}
        onClickBasket={goToBasket}
        onOpenMobileMenu={() => {}}
      />

      <Box sx={sx.content}>
        <LkMenu 
          active={chapter}
          menuList={menuList}
          onChange={changeChapter}
        />
        {props.children}
      </Box>
    </Box>
  );
}
