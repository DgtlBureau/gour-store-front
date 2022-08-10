import { ReactNode } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';

import { selectedProductCount, selectedProductSum, selectedProductDiscount } from '../../store/slices/orderSlice';
import { useGetCurrentUserQuery, useChangeCurrentCityMutation } from 'store/api/currentUserApi';
import { useGetCityListQuery } from 'store/api/cityApi';
import { useGetCurrentBalanceQuery } from 'store/api/walletApi';
import { useSignOutMutation } from 'store/api/authApi';
import { GameFlipWarning } from 'components/Game/FlipWarning/FlipWarning';
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
  const { data: balance = 0 } = useGetCurrentBalanceQuery();

  const [changeCity] = useChangeCurrentCityMutation();
  const [signOut] = useSignOutMutation();

  const convertedCities =
    cities?.map(city => ({
      id: city.id,
      name: city.name[language],
    })) || [];

  const count = useSelector(selectedProductCount);
  const sum = useSelector(selectedProductSum);
  const sumDiscount = useSelector(selectedProductDiscount);

  const selectedCity = cities?.find(city => city.id === currentUser?.city.id) || cities?.[0];

  const screenHeight = window.screen.height;
  const screenWidth = window.screen.width;

  const flipIsNeeded = screenWidth < 600 || (screenWidth < 900 && screenHeight > screenWidth);

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
        basketProductSum={sum - sumDiscount}
        moneyAmount={balance}
        onChangeCity={changeCity}
        onClickFavorite={goToFavorites}
        onClickPersonalArea={goToPersonalArea}
        onClickBasket={goToBasket}
        onClickReplenishment={goToReplenishment}
        onClickSignout={signOut}
        {...contacts}
      />

      {flipIsNeeded ? <GameFlipWarning /> : <Box sx={sx.content}>{children}</Box>}

      <Copyright />
    </Box>
  );
}
