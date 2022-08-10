import React, { ReactNode } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';

import translations from './PA.i18n.json';
import { useLocalTranslation } from '../../hooks/useLocalTranslation';
import { useChangeCurrentCityMutation, useGetCurrentUserQuery } from '../../store/api/currentUserApi';
import { selectedProductCount, selectedProductSum, selectedProductDiscount } from '../../store/slices/orderSlice';
import { useGetCityListQuery } from '../../store/api/cityApi';
import { useSignOutMutation } from 'store/api/authApi';
import { useGetCurrentBalanceQuery } from 'store/api/walletApi';
import { Box } from '../../components/UI/Box/Box';
import { Header } from '../../components/Header/Header';
import { PAMenu } from '../../components/PA/Menu/Menu';
import { LocalConfig } from '../../hooks/useLocalTranslation';
import { contacts } from '../../constants/contacts';
import { Currency } from '../../@types/entities/Currency';
import { PrivateLayout } from 'layouts/Private/Private';
import { Path } from '../../constants/routes';

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
  const { data: balance = 0 } = useGetCurrentBalanceQuery();

  const [signOut] = useSignOutMutation();
  const [changeCity] = useChangeCurrentCityMutation();

  const { t } = useLocalTranslation(translations);

  const currentPath = router.pathname;

  const convertedCities =
    cities?.map(city => ({
      id: city.id,
      name: city.name[language],
    })) || [];

  const count = useSelector(selectedProductCount);
  const sum = useSelector(selectedProductSum);
  const sumDiscount = useSelector(selectedProductDiscount);

  const selectedCity = cities?.find(city => city.id === currentUser?.city.id) || cities?.[0];

  const menuList = [
    {
      label: t('main'),
      path: `/${Path.PERSONAL_AREA}`,
    },
    {
      label: t('orders'),
      path: `/${Path.PERSONAL_AREA}/${Path.ORDERS}`,
    },
    {
      label: t('credentials'),
      path: `/${Path.PERSONAL_AREA}/${Path.CREDENTIALS}`,
    },
    {
      label: t('addresses'),
      path: `/${Path.PERSONAL_AREA}/${Path.ADDRESSES}`,
    },
    {
      label: t('discounts'),
      path: `/${Path.PERSONAL_AREA}/${Path.DISCOUNTS}`,
    },
  ];

  const goToFavorites = () => router.push(`/${Path.FAVORITES}`);
  const goToBasket = () => router.push(`/${Path.BASKET}`);
  const goToPersonalArea = () => router.push(`/${Path.PERSONAL_AREA}`);
  const goToReplenishment = () => router.push(`/${Path.REPLENISHMENT}`);

  const changeChapter = (path: string) => path !== currentPath && router.push(path);

  return (
    <PrivateLayout>
      <Box sx={sx.layout}>
        <Header
          {...contacts}
          selectedCityId={selectedCity?.id || 0}
          cities={convertedCities}
          currency={currency}
          language={language}
          basketProductCount={count}
          basketProductSum={sum - sumDiscount}
          moneyAmount={balance}
          onChangeCity={changeCity}
          onClickFavorite={goToFavorites}
          onClickPersonalArea={goToPersonalArea}
          onClickBasket={goToBasket}
          onClickReplenishment={goToReplenishment}
          onClickSignout={signOut}
        />

        <Box sx={sx.content}>
          <PAMenu active={currentPath} menuList={menuList} onChange={changeChapter} />
          {children}
        </Box>
      </Box>
    </PrivateLayout>
  );
}
