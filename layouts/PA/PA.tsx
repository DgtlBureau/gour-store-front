import React, { ReactNode, useState } from 'react';

import { useSignOutMutation } from 'store/api/authApi';
import { useGetCityListQuery } from 'store/api/cityApi';
import { useChangeCurrentCityMutation, useGetCurrentUserQuery } from 'store/api/currentUserApi';
import { useBuyCheeseCoinsMutation, useCreateInvoiceMutation } from 'store/api/invoiceApi';
import { useGetCurrentBalanceQuery } from 'store/api/walletApi';
import { selectedProductCount, selectedProductDiscount, selectedProductSum } from 'store/slices/orderSlice';

import { PrivateLayout } from 'layouts/Private/Private';

import { CheesecoinsAddModal } from 'components/Cheesecoins/AddModal/AddModal';
import { BuyCheeseCoinsModal } from 'components/Cheesecoins/BuyModal/BuyModal';
import { Header } from 'components/Header/Header';
import { useAppNavigation } from 'components/Navigation';
import { PAMenu } from 'components/PA/Menu/Menu';
import { Box } from 'components/UI/Box/Box';

import { PayInvoiceDto } from 'types/dto/invoice/payInvoice.dto';
import { InvoiceStatus } from 'types/entities/IInvoice';

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
  const { language, pathname, currency } = useAppNavigation();

  const { data: cities } = useGetCityListQuery();
  const { data: currentUser } = useGetCurrentUserQuery();
  const { data: balance = 0 } = useGetCurrentBalanceQuery();

  const [signOut] = useSignOutMutation();
  const [changeCity] = useChangeCurrentCityMutation();
  const [createInvoiceMutation, { data: invoiceData }] = useCreateInvoiceMutation();
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

  const handleAddCheeseCoinClick = ({ invoicePrice, coinsCount }: { invoicePrice: number; coinsCount: number }) => {
    toggleCheeseCoinModalOpen(false);
    setBuyCheeseCoinState({
      isOpenModal: true,
      price: invoicePrice,
    });
    createInvoiceMutation({
      currency: 'RUB',
      amount: coinsCount,
      value: invoicePrice,
      payerUuid: currentUser?.id ?? '',
    });
  };

  const handleCloseBuyModal = () =>
    setBuyCheeseCoinState({
      isOpenModal: false,
      price: null,
    });

  const handleBuyCheeseCoins = async (buyData: PayInvoiceDto) => {
    try {
      const result = await buyCheeseCoins(buyData).unwrap();
      if (result.status === InvoiceStatus.PAID) {
        window.open(`/?paymentStatus=success&amount=${buyData.price}`, '_self');
      } else {
        window.open('/?paymentStatus=failure', '_self');
      }
    } catch {
      window.open('/?paymentStatus=failure', '_self');
    }
  };

  const onOpenCoinsAddModal = () => toggleCheeseCoinModalOpen(true);
  const onCloseCoinsAddModal = () => toggleCheeseCoinModalOpen(false);

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
          onClickAddCoins={onOpenCoinsAddModal}
          onClickSignout={signOut}
        />

        <Box sx={sx.content}>
          <PAMenu active={pathname} options={menuList} />
          {children}
        </Box>

        <CheesecoinsAddModal
          isOpened={isCheeseCoinModalOpen}
          onClose={onCloseCoinsAddModal}
          onSubmit={handleAddCheeseCoinClick}
        />

        <BuyCheeseCoinsModal
          isOpened={buyCheeseCoinState.isOpenModal}
          userEmail={currentUser?.email}
          userId={currentUser?.id}
          invoiceUuid={invoiceData?.uuid}
          price={buyCheeseCoinState.price}
          isLoading={isPaymentLoading}
          onClose={handleCloseBuyModal}
          onSubmit={handleBuyCheeseCoins}
        />
      </Box>
    </PrivateLayout>
  );
}
