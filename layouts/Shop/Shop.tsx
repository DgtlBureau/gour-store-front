import { ReactNode, useState } from 'react';

import { useSignOutMutation } from 'store/api/authApi';
import { useGetCityListQuery } from 'store/api/cityApi';
import { useChangeCurrentCityMutation, useGetCurrentUserQuery } from 'store/api/currentUserApi';
import { useBuyCheeseCoinsMutation } from 'store/api/invoiceApi';
import { useGetCurrentBalanceQuery } from 'store/api/walletApi';
import { selectedProductCount, selectedProductDiscount, selectedProductSum } from 'store/slices/orderSlice';

import { CheesecoinsAddModal } from 'components/Cheesecoins/AddModal/AddModal';
import { BuyCheeseCoinsModal } from 'components/Cheesecoins/BuyModal/BuyModal';
// import { Copyright } from 'components/Copyright/Copyright';
import { Footer } from 'components/Footer/Footer';
import { Header } from 'components/Header/Header';
import { useAppNavigation } from 'components/Navigation';
import { Box } from 'components/UI/Box/Box';

import { PayInvoiceDto } from 'types/dto/invoice/payInvoice.dto';
import { Currency } from 'types/entities/Currency';
import { Language } from 'types/entities/Language';

import { useAppSelector } from 'hooks/store';

import { contacts } from 'constants/contacts';

import sx from './Shop.styles';

export interface ShopLayoutProps {
  currency: Currency;
  language: Language;
  children?: ReactNode;
}

export function ShopLayout({ currency, language, children }: ShopLayoutProps) {
  const { data: cities } = useGetCityListQuery();
  const { data: currentUser } = useGetCurrentUserQuery();
  const { data: balance = 0 } = useGetCurrentBalanceQuery();
  const [isCheeseCoinModalOpen, toggleCheeseCoinModalOpen] = useState(false);
  const [buyCheeseCoinState, setBuyCheeseCoinState] = useState({
    isOpenModal: true,
    price: null as null | number,
  });

  const [buyCheeseCoins, { isLoading: isPaymentLoading }] = useBuyCheeseCoinsMutation();
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

  const selectedCity = cities?.find(city => city.id === currentUser?.city?.id) || cities?.[0];

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
        onClickReplenishment={() => toggleCheeseCoinModalOpen(true)}
        onClickSignout={signOut}
      />

      <Box sx={sx.content}>{children}</Box>

      <Footer {...contacts} sx={sx.footer} />

      {/* <Copyright /> */}

      <CheesecoinsAddModal
        isOpened={isCheeseCoinModalOpen}
        onClose={() => toggleCheeseCoinModalOpen(false)}
        onSubmit={onAddCheeseCoinClick}
      />

      <BuyCheeseCoinsModal
        isOpened={buyCheeseCoinState.isOpenModal}
        userEmail={currentUser?.email}
        price={buyCheeseCoinState.price ?? 52_000}
        isLoading={isPaymentLoading}
        onClose={onCloseBuyModal}
        onSubmit={buyCheeseCoins}
      />
    </Box>
  );
}
