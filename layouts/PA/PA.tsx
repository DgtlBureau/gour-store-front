import React, { ReactNode } from 'react';

import { useSignOutMutation } from 'store/api/authApi';
import { useGetCityListQuery } from 'store/api/cityApi';
import { useChangeCurrentCityMutation, useGetCurrentUserQuery } from 'store/api/currentUserApi';
import { useGetCurrentBalanceQuery } from 'store/api/walletApi';
import { selectedProductCount, selectedProductDiscount, selectedProductSum } from 'store/slices/orderSlice';

import { PrivateLayout } from 'layouts/Private/Private';

import { Header } from 'components/Header/Header';
import { useAppNavigation } from 'components/Navigation';
import { PAMenu } from 'components/PA/Menu/Menu';
import { Box } from 'components/UI/Box/Box';

import { Currency } from 'types/entities/Currency';

import { useAppSelector } from 'hooks/store';
import { useLocalTranslation } from 'hooks/useLocalTranslation';

import { contacts } from 'constants/contacts';
import { Path } from 'constants/routes';

import translations from './PA.i18n.json';
import sx from './PA.styles';

export interface PALayoutProps {
  children?: ReactNode;
}

export function PALayout({ children }: PALayoutProps) {
  const { goToFavorites, goToBasket, goToPersonalArea, goToReplenishment, language, pathname, changeChapter } =
    useAppNavigation();
  const currency: Currency = 'cheeseCoin';

  const { data: cities } = useGetCityListQuery();
  const { data: currentUser } = useGetCurrentUserQuery();
  const { data: balance = 0 } = useGetCurrentBalanceQuery();

  const [signOut] = useSignOutMutation();
  const [changeCity] = useChangeCurrentCityMutation();

  const { t } = useLocalTranslation(translations);

  const convertedCities =
    cities?.map(city => ({
      id: city.id,
      name: city.name[language],
    })) || [];

  const count = useAppSelector(selectedProductCount);
  const sum = useAppSelector(selectedProductSum);
  const sumDiscount = useAppSelector(selectedProductDiscount);

  const selectedCity = cities?.find(city => city.id === currentUser?.city?.id) || cities?.[0];

  const menuList = [
    {
      label: t('main'),
      path: `/${Path.PERSONAL_AREA}`,
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
      label: t('orders'),
      path: `/${Path.PERSONAL_AREA}/${Path.ORDERS}`,
    },
    {
      label: t('discounts'),
      path: `/${Path.PERSONAL_AREA}/${Path.DISCOUNTS}`,
    },
  ];

  return (
    <PrivateLayout>
      <Box sx={sx.layout}>
        <Header
          {...contacts}
          selectedCityId={selectedCity?.id || 0}
          cities={convertedCities}
          currency={currency}
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
          <PAMenu active={pathname} menuList={menuList} onChange={changeChapter} />
          {children}
        </Box>
      </Box>
    </PrivateLayout>
  );
}
