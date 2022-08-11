import { ReactNode, useState } from 'react';
import { useRouter } from 'next/router';

import { selectedProductCount, selectedProductSum, selectedProductDiscount } from '../../store/slices/orderSlice';
import { useGetCurrentUserQuery, useChangeCurrentCityMutation } from 'store/api/currentUserApi';
import { useGetCityListQuery } from 'store/api/cityApi';
import { useGetCurrentBalanceQuery } from 'store/api/walletApi';
import { useSignOutMutation } from 'store/api/authApi';

import { useAppSelector } from 'hooks/store';
import { CheesecoinsAddModal } from 'components/Cheesecoins/AddModal/AddModal';
import { Box } from '../../components/UI/Box/Box';
import { Header } from '../../components/Header/Header';
import { Footer } from '../../components/Footer/Footer';
import { Copyright } from '../../components/Copyright/Copyright';
import { Currency } from '../../@types/entities/Currency';
import { Language } from '../../@types/entities/Language';
import { AddCheesecoinsDto } from '../../@types/dto/cheseecoins/add.dto';
import { contacts } from '../../constants/contacts';
import { Path } from '../../constants/routes';

import sx from './Shop.styles';

export interface ShopLayoutProps {
  currency: Currency;
  language: Language;
  children?: ReactNode;
}

export function ShopLayout({ currency, language, children }: ShopLayoutProps) {
  const router = useRouter();
  const { data: cities } = useGetCityListQuery();
  const { data: currentUser } = useGetCurrentUserQuery();
  const { data: balance = 0 } = useGetCurrentBalanceQuery();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [changeCity] = useChangeCurrentCityMutation();
  const [signOut] = useSignOutMutation();

  const handleAddCheesecoins = (data: AddCheesecoinsDto) => console.log(data);

  const convertedCities =
    cities?.map(city => ({
      id: city.id,
      name: city.name[language],
    })) || [];

  const count = useAppSelector(selectedProductCount);
  const sum = useAppSelector(selectedProductSum);
  const sumDiscount = useAppSelector(selectedProductDiscount);

  const selectedCity = cities?.find(city => city.id === currentUser?.city.id) || cities?.[0];

  const goToFavorites = () => router.push(`/${Path.FAVORITES}`);
  const goToBasket = () => router.push(`/${Path.BASKET}`);
  const goToPersonalArea = () => router.push(`/${Path.PERSONAL_AREA}`);

  const openCheesecoinsModal = () => setIsModalOpen(true);
  const closeCheesecoinsModal = () => setIsModalOpen(false);

  return (
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
        onClickReplenishment={openCheesecoinsModal}
        onClickSignout={signOut}
      />

      <Box sx={sx.content}>{children}</Box>

      <Footer {...contacts} sx={sx.footer} />

      <Copyright />

      <CheesecoinsAddModal
        isOpened={isModalOpen}
        title="Добавление чизкоинов"
        onClose={closeCheesecoinsModal}
        onSubmit={handleAddCheesecoins}
      />
    </Box>
  );
}
