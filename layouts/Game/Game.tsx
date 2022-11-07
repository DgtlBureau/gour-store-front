import { ReactNode, useState } from 'react';

import { useMediaQuery } from '@mui/material';

import { useSignOutMutation } from 'store/api/authApi';
import { useGetCityListQuery } from 'store/api/cityApi';
import { useChangeCurrentCityMutation, useGetCurrentUserQuery } from 'store/api/currentUserApi';
import { useBuyCheeseCoinsMutation, useCreateInvoiceMutation } from 'store/api/invoiceApi';
import { useGetCurrentBalanceQuery } from 'store/api/walletApi';
import { selectedProductCount, selectedProductDiscount, selectedProductSum } from 'store/slices/orderSlice';

import { CheesecoinsAddModal } from 'components/Cheesecoins/AddModal/AddModal';
import { BuyCheeseCoinsModal } from 'components/Cheesecoins/BuyModal/BuyModal';
import { GameFlipWarning } from 'components/Game/FlipWarning/FlipWarning';
import { Header } from 'components/Header/Header';
import { useAppNavigation } from 'components/Navigation';
import { Box } from 'components/UI/Box/Box';

import { PayInvoiceDto } from 'types/dto/invoice/payInvoice.dto';
import { InvoiceStatus } from 'types/entities/IInvoice';

import { useAppSelector } from 'hooks/store';

import { contacts } from 'constants/contacts';

import sx from './Game.styles';

type BuyCheeseCoinState = { isOpenModal: false; price: null } | { isOpenModal: true; price: number };

export interface GameLayoutProps {
  children?: ReactNode;
}

export function GameLayout({ children }: GameLayoutProps) {
  const { currency, language } = useAppNavigation();

  const { data: cities } = useGetCityListQuery();
  const { data: currentUser } = useGetCurrentUserQuery();
  const { data: balance = 0 } = useGetCurrentBalanceQuery();

  const [buyCheeseCoins, { isLoading: isPaymentLoading }] = useBuyCheeseCoinsMutation();
  const [createInvoiceMutation, { data: invoiceData }] = useCreateInvoiceMutation();
  const [changeCity] = useChangeCurrentCityMutation();
  const [signOut] = useSignOutMutation();

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

  const isMobile = useMediaQuery('(max-width: 600px)');
  const isPortrait = useMediaQuery('(orientation: portrait)');

  const flipIsNeeded = isMobile && isPortrait;

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

  const onCloseBuyModal = () =>
    setBuyCheeseCoinState({
      isOpenModal: false,
      price: null,
    });

  const onOpenCoinsAddModal = () => toggleCheeseCoinModalOpen(true);
  const onCloseCoinsAddModal = () => toggleCheeseCoinModalOpen(false);

  return (
    <Box sx={sx.layout}>
      <Header
        isGame
        selectedCityId={selectedCity?.id || 0}
        cities={convertedCities}
        currency={currency}
        basketProductCount={count}
        basketProductSum={sum - sumDiscount}
        moneyAmount={balance}
        onChangeCity={changeCity}
        onClickAddCoins={onOpenCoinsAddModal}
        onClickSignout={signOut}
        {...contacts}
      />

      <Box sx={sx.content}>{flipIsNeeded ? <GameFlipWarning /> : children}</Box>

      <CheesecoinsAddModal
        isOpened={isCheeseCoinModalOpen}
        onClose={onCloseCoinsAddModal}
        onSubmit={handleAddCheeseCoinClick}
      />

      <BuyCheeseCoinsModal
        isOpened={buyCheeseCoinState.isOpenModal}
        invoiceUuid={invoiceData?.uuid}
        userId={currentUser?.id}
        userEmail={currentUser?.email}
        price={buyCheeseCoinState.price}
        isLoading={isPaymentLoading}
        onClose={onCloseBuyModal}
        onSubmit={handleBuyCheeseCoins}
      />
    </Box>
  );
}
