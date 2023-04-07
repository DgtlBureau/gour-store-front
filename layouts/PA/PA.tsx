import React, { ReactNode, useState } from 'react';

import { useSignOutMutation } from 'store/api/authApi';
import { useGetCityListQuery } from 'store/api/cityApi';
import { useChangeCurrentCityMutation, useGetCurrentUserQuery } from 'store/api/currentUserApi';
import { useBuyCheeseCoinsMutation, useCreateInvoiceMutation } from 'store/api/invoiceApi';
import { useGetCurrentBalanceQuery } from 'store/api/walletApi';
import { selectedProductCount, selectedProductSum } from 'store/slices/orderSlice';

import { PrivateLayout } from 'layouts/Private/Private';

import { CheesecoinsAddModal } from 'components/Cheesecoins/AddModal/AddModal';
import { BuyCheeseCoinsModal } from 'components/Cheesecoins/BuyModal/BuyModal';
import { Header } from 'components/Header/Header';
import { useAppNavigation } from 'components/Navigation';
import { Box } from 'components/UI/Box/Box';
import { Tabs } from 'components/UI/Tabs/Tabs';

import { PayInvoiceDto } from 'types/dto/invoice/payInvoice.dto';
import { InvoiceStatus } from 'types/entities/IInvoice';
import { NotificationType } from 'types/entities/Notification';

import { contacts } from 'constants/contacts';
import { Path } from 'constants/routes';
import {useAppDispatch, useAppSelector} from 'hooks/store';
import { useLocalTranslation } from 'hooks/useLocalTranslation';
import { dispatchNotification } from 'packages/EventBus';
import { getErrorMessage } from 'utils/errorUtil';

import translations from './PA.i18n.json';

import sx from './PA.styles';
import {setCurrentCity} from "../../store/slices/citySlice";
import {selectIsAuth} from "../../store/selectors/auth";

type BalanceCoinState = { isOpen: false } | { isOpen: true; coins?: number };
type BuyCoinsState = { isOpen: false } | { isOpen: true; price: number };

export interface PALayoutProps {
  children?: ReactNode;
}

export function PALayout({ children }: PALayoutProps) {
  const { language, pathname, currency, goToSuccessPayment, goToFailurePayment, goToIntro } = useAppNavigation();

  const { data: cities } = useGetCityListQuery();
  const { data: currentUser } = useGetCurrentUserQuery();
  const { data: balance = 0 } = useGetCurrentBalanceQuery();

  const [signOut] = useSignOutMutation();
  const [changeCity] = useChangeCurrentCityMutation();
  const dispatch = useAppDispatch();
  const isAuth = useAppSelector(selectIsAuth);
  if (!isAuth) {
    goToIntro();
    return null
  }

  const updateCity = (cityId:any) => {
    const city = cities?.find((city) => city.id === cityId);
    if (city) {
      if (isAuth) {
        changeCity(cityId);
      }

      dispatch(setCurrentCity(city));
    }
  }

  const [createInvoiceMutation, { data: invoiceData }] = useCreateInvoiceMutation();
  const [buyCheeseCoins, { isLoading: isPaymentLoading }] = useBuyCheeseCoinsMutation();

  const { t } = useLocalTranslation(translations);

  const convertedCities =
    cities?.map(city => ({
      id: city.id,
      name: city.name[language],
    })) || [];

  const count = useAppSelector(selectedProductCount);
  const totalProductSum = useAppSelector((state) => selectedProductSum(state,currentUser));

  const [balanceCoinsState, setBalanceCoinsState] = useState<BalanceCoinState>({
    isOpen: false,
  });
  const [payCoinsState, setPayCoinsState] = useState<BuyCoinsState>({
    isOpen: false,
  });

  const selectedCity = cities?.find(city => city.id === currentUser?.city?.id) || cities?.[0];

  const menuOptions = [
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
    setBalanceCoinsState({ isOpen: false });
    setPayCoinsState({
      isOpen: true,
      price: invoicePrice,
    });
    createInvoiceMutation({
      currency: 'RUB',
      amount: coinsCount,
      value: invoicePrice,
      payerUuid: currentUser?.id ?? '',
    });
  };

  const handleCloseBuyModal = () => {
    if (payCoinsState.isOpen) {
      const { price } = payCoinsState;
      setBalanceCoinsState({ isOpen: true, coins: price });
      setPayCoinsState({ isOpen: false });
    }
  };

  const handleOpenCoinsAddModal = () =>
    setBalanceCoinsState({
      isOpen: true,
      coins: undefined,
    });

  const handleCloseCoinsAddModal = () => setBalanceCoinsState({ isOpen: false });

  const handleBuyCheeseCoins = async (buyData: PayInvoiceDto) => {
    try {
      const result = await buyCheeseCoins(buyData).unwrap();
      if (result.status === InvoiceStatus.PAID) goToSuccessPayment(buyData.price);
      if (result.status === InvoiceStatus.FAILED) goToFailurePayment();
    } catch (e) {
      const mayBeError = getErrorMessage(e);
      if (mayBeError) {
        dispatchNotification(mayBeError, { type: NotificationType.DANGER });
      } else {
        goToFailurePayment();
      }
    }
  };

  return (
    <PrivateLayout>
      <Box sx={sx.layout}>
        <Header
          {...contacts}
          selectedCityId={selectedCity?.id || 0}
          cities={convertedCities}
          basketProductCount={count}
          basketProductSum={totalProductSum}
          moneyAmount={balance}
          onChangeCity={updateCity}
          onClickAddCoins={handleOpenCoinsAddModal}
          onClickSignout={signOut}
        />

        <Box sx={sx.content}>
          <Tabs withLink sx={sx.menu} value={pathname} options={menuOptions} />

          {children}
        </Box>

        <CheesecoinsAddModal
          initCoins={balanceCoinsState.isOpen ? balanceCoinsState.coins : undefined}
          isOpened={balanceCoinsState.isOpen}
          onClose={handleCloseCoinsAddModal}
          onSubmit={handleAddCheeseCoinClick}
        />

        <BuyCheeseCoinsModal
          isOpened={payCoinsState.isOpen}
          invoiceUuid={invoiceData?.uuid}
          userId={currentUser?.id}
          userEmail={currentUser?.email}
          fullName={[currentUser?.firstName, currentUser?.lastName].join(' ')}
          code={currentUser?.referralCode?.code || ''}
          price={payCoinsState.isOpen ? payCoinsState.price : undefined}
          isLoading={isPaymentLoading}
          onClose={handleCloseBuyModal}
          onSubmit={handleBuyCheeseCoins}
        />
      </Box>
    </PrivateLayout>
  );
}
