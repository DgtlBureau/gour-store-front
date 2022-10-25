import React, { ReactNode, useState } from 'react';

import { useSignOutMutation } from 'store/api/authApi';
import { useGetCityListQuery } from 'store/api/cityApi';
import { useChangeCurrentCityMutation, useGetCurrentUserQuery } from 'store/api/currentUserApi';
import { useBuyCheeseCoinsMutation } from 'store/api/invoiceApi';
import { useGetCurrentBalanceQuery } from 'store/api/walletApi';
import { selectedProductCount, selectedProductDiscount, selectedProductSum } from 'store/slices/orderSlice';

import { PrivateLayout } from 'layouts/Private/Private';

import { CheesecoinsAddModal } from 'components/Cheesecoins/AddModal/AddModal';
import { BuyCheeseCoinsModal } from 'components/Cheesecoins/BuyModal/BuyModal';
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

type BuyCheeseCoinState = { isOpenModal: false; price: null } | { isOpenModal: true; price: number };

export interface PALayoutProps {
  children?: ReactNode;
}

export function PALayout({ children }: PALayoutProps) {
  const { language, pathname } = useAppNavigation();
  const currency: Currency = 'cheeseCoin';

  const { data: cities } = useGetCityListQuery();
  const { data: currentUser } = useGetCurrentUserQuery();
  const { data: balance = 0 } = useGetCurrentBalanceQuery();

  const [signOut] = useSignOutMutation();
  const [changeCity] = useChangeCurrentCityMutation();
  const [buyCheeseCoins, { isLoading: isPaymentLoading }] = useBuyCheeseCoinsMutation();

  const { t } = useLocalTranslation(translations);

  const convertedCities =
    cities?.map(city => ({
      id: city.id,
      name: city.name[language],
    })) || [];

  const count = useAppSelector(selectedProductCount);
  const sum = useAppSelector(selectedProductSum);
  const sumDiscount = useAppSelector(selectedProductDiscount);

  const [isCheeseCoinModalOpen, toggleCheeseCoinModalOpen] = useState(false);
  const [buyCheeseCoinState, setBuyCheeseCoinState] = useState<BuyCheeseCoinState>({
    isOpenModal: false,
    price: null,
  });

  const selectedCity = cities?.find(city => city.id === currentUser?.city?.id) || cities?.[0];

  const menuList = [
    {
      label: t('main'),
      value: `/${Path.PERSONAL_AREA}`,
    },
    {
      label: t('credentials'),
      value: `/${Path.PERSONAL_AREA}/${Path.CREDENTIALS}`,
    },
    {
      label: t('addresses'),
      value: `/${Path.PERSONAL_AREA}/${Path.ADDRESSES}`,
    },
    {
      label: t('orders'),
      value: `/${Path.PERSONAL_AREA}/${Path.ORDERS}`,
    },
    {
      label: t('discounts'),
      value: `/${Path.PERSONAL_AREA}/${Path.DISCOUNTS}`,
    },
    {
      label: t('payments'),
      value: `/${Path.PERSONAL_AREA}/${Path.PAYMENTS}`,
    },
  ];

  const onAddCheeseCoinClick = (price: number) => {
    toggleCheeseCoinModalOpen(false);
    setBuyCheeseCoinState({
      isOpenModal: true,
      price,
    });
  };

  const onCloseBuyModal = () =>
    setBuyCheeseCoinState({
      isOpenModal: false,
      price: null,
    });

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
          onClickAddCoins={() => toggleCheeseCoinModalOpen(true)}
          onClickSignout={signOut}
        />

        <Box sx={sx.content}>
          <PAMenu active={pathname} options={menuList} />
          {children}
        </Box>

        <CheesecoinsAddModal
          isOpened={isCheeseCoinModalOpen}
          onClose={() => toggleCheeseCoinModalOpen(false)}
          onSubmit={onAddCheeseCoinClick}
        />

        <BuyCheeseCoinsModal
          isOpened={buyCheeseCoinState.isOpenModal}
          userEmail={currentUser?.email}
          price={buyCheeseCoinState.price}
          isLoading={isPaymentLoading}
          onClose={onCloseBuyModal}
          onSubmit={buyCheeseCoins}
        />
      </Box>
    </PrivateLayout>
  );
}
