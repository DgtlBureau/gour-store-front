import { ReactNode } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';

import { selectedProductCount, selectedProductSum } from '../../store/slices/orderSlice';
import { useGetCurrentUserQuery, useChangeCurrentCityMutation } from 'store/api/currentUserApi';
import { useGetCityListQuery } from 'store/api/cityApi';
import { Box } from '../../components/UI/Box/Box';
import { Header } from '../../components/Header/Header';
import { Copyright } from '../../components/Copyright/Copyright';
import { Currency } from '../../@types/entities/Currency';
import { Language } from '../../@types/entities/Language';
import { contacts } from '../../constants/contacts';

import sx from './Game.styles';

export interface GameLayoutProps {
  currency: Currency;
  language: Language;
  children?: ReactNode;
}

export function GameLayout({ currency, language, children }: GameLayoutProps) {
  const router = useRouter();

  const { data: cities } = useGetCityListQuery();
  const { data: currentUser } = useGetCurrentUserQuery();

  const [changeCity] = useChangeCurrentCityMutation();

  const convertedCities =
    cities?.map(city => ({
      id: city.id,
      name: city.name[language],
    })) || [];

  const count = useSelector(selectedProductCount);
  const sum = useSelector(selectedProductSum);

  const selectedCity = cities?.find(city => city.id === currentUser?.cityId) || cities?.[0];

  const goToFavorites = () => router.push('/favorites');
  const goToBasket = () => router.push('/basket');
  const goToPersonalArea = () => router.push('/personal-area');
  const goToReplenishment = () => router.push('/replenishment');

  return (
    <Box sx={sx.layout}>
      <Header
        isGame
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
        onClickReplenishment={goToReplenishment}
        onClickSignout={() => ({})}
        {...contacts}
      />

      <Box sx={sx.content}>{children}</Box>

      <Box sx={sx.copyright}>
        <Copyright />
      </Box>
    </Box>
  );
}
