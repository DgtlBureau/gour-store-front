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

import { useAppSelector } from 'hooks/store';

import { contacts } from 'constants/contacts';

import sx from './Game.styles';

type BalanceCoinState = { isOpen: false } | { isOpen: true; coins?: number };
type BuyCoinsState = { isOpen: false } | { isOpen: true; price: number };

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

  const [balanceCoinsState, setBalanceCoinsState] = useState<BalanceCoinState>({
    isOpen: false,
  });
  const [payCoinsState, setPayCoinsState] = useState<BuyCoinsState>({
    isOpen: false,
  });

  const selectedCity = cities?.find(city => city.id === currentUser?.city?.id) || cities?.[0];

  const isMobile = useMediaQuery('(max-width: 600px)');
  const isPortrait = useMediaQuery('(orientation: portrait)');

  const flipIsNeeded = isMobile && isPortrait;

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
        onClickAddCoins={handleOpenCoinsAddModal}
        onClickSignout={signOut}
        {...contacts}
      />

      <Box sx={sx.content}>{flipIsNeeded ? <GameFlipWarning /> : children}</Box>

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
        price={payCoinsState.isOpen ? payCoinsState.price : undefined}
        isLoading={isPaymentLoading}
        onClose={handleCloseBuyModal}
        onSubmit={buyCheeseCoins}
      />
    </Box>
  );
}
