import { ReactNode, useState } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';

import {
  selectedProductCount,
  selectedProductSum,
} from '../../store/slices/orderSlice';
import {
  useGetCurrentUserQuery,
  useChangeCurrentCityMutation,
} from 'store/api/currentUserApi';
import { useGetCityListQuery } from 'store/api/cityApi';

import { Box } from '../../components/UI/Box/Box';
import { Header } from '../../components/Header/Header';
import { Footer } from '../../components/Footer/Footer';
import { Copyright } from '../../components/Copyright/Copyright';
import { Currency } from '../../@types/entities/Currency';
import { Language } from '../../@types/entities/Language';
import { AddCheesecoinsDto } from '../../@types/dto/cheseecoins/add.dto';
import { contacts } from '../../constants/contacts';

import sx from './Shop.styles';
import { CheesecoinsAddModal } from 'components/Cheesecoins/AddModal/AddModal';

export interface ShopLayoutProps {
  currency: Currency;
  language: Language;
  children?: ReactNode;
}

export function ShopLayout({ currency, language, children }: ShopLayoutProps) {
  const router = useRouter();
  const { data: cities } = useGetCityListQuery();
  const { data: currentUser } = useGetCurrentUserQuery();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [changeCity] = useChangeCurrentCityMutation();

  const handleAddChesecoins = (data: AddCheesecoinsDto) => {
    console.log(data);
  };

  const convertedCities =
    cities?.map(city => ({
      id: city.id,
      name: city.name[language],
    })) || [];

  const count = useSelector(selectedProductCount);
  const sum = useSelector(selectedProductSum);

  const selectedCity =
    cities?.find(city => city.id === currentUser?.cityId) || cities?.[0];

  const goToFavorites = () => router.push('/favorites');
  const goToBasket = () => router.push('/basket');
  const goToPersonalArea = () => router.push('/personal-area');

  return (
    <Box sx={sx.layout}>
      <Header
        {...contacts}
        selectedCityId={selectedCity?.id || 0}
        cities={convertedCities}
        currency={currency}
        language={language}
        basketProductCount={count}
        basketProductSum={sum}
        moneyAmount={1000}
        onChangeCity={changeCity}
        onClickFavorite={goToFavorites}
        onClickPersonalArea={goToPersonalArea}
        onClickBasket={goToBasket}
        onClickReplenishment={() => setIsModalOpen(true)}
        onClickSignout={() => ({})}
      />

      <Box sx={sx.content}>{children}</Box>

      <Footer {...contacts} sx={sx.footer} />

      <Copyright />

      <CheesecoinsAddModal
        isOpened={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Добавление чизкоинов"
        onSubmit={handleAddChesecoins}
      />
    </Box>
  );
}
