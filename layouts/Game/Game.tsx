import { ReactNode } from 'react';

import { useMediaQuery } from '@mui/material';

import { useSignOutMutation } from 'store/api/authApi';
import { useGetCityListQuery } from 'store/api/cityApi';
import { useChangeCurrentCityMutation, useGetCurrentUserQuery } from 'store/api/currentUserApi';
import { useGetCurrentBalanceQuery } from 'store/api/walletApi';
import { selectedProductCount, selectedProductDiscount, selectedProductSum } from 'store/slices/orderSlice';

import { Copyright } from 'components/Copyright/Copyright';
import { GameFlipWarning } from 'components/Game/FlipWarning/FlipWarning';
import { Header } from 'components/Header/Header';
import { useAppNavigation } from 'components/Navigation';
import { Box } from 'components/UI/Box/Box';

import { Currency } from 'types/entities/Currency';
import { Language } from 'types/entities/Language';

import { useAppSelector } from 'hooks/store';

import { contacts } from 'constants/contacts';

import sx from './Game.styles';

export interface GameLayoutProps {
  currency: Currency;
  language: Language;
  children?: ReactNode;
}

export function GameLayout({ currency, language, children }: GameLayoutProps) {
  const { goToFavorites, goToBasket, goToPersonalArea, goToReplenishment } = useAppNavigation();

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

  const count = useAppSelector(selectedProductCount);
  const sum = useAppSelector(selectedProductSum);
  const sumDiscount = useAppSelector(selectedProductDiscount);

  const selectedCity = cities?.find(city => city.id === currentUser?.city?.id) || cities?.[0];

  const isMobile = useMediaQuery('(max-width: 600px)');
  const isPortrait = useMediaQuery('(orientation: portrait)');

  const flipIsNeeded = isMobile && isPortrait;

  const copyrightSx = { display: { xs: isPortrait ? 'flex' : 'none', md: 'flex' } };

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
        onClickFavorite={goToFavorites}
        onClickPersonalArea={goToPersonalArea}
        onClickBasket={goToBasket}
        onClickReplenishment={goToReplenishment}
        onClickSignout={signOut}
        {...contacts}
      />

      {flipIsNeeded ? <GameFlipWarning /> : <Box sx={sx.content}>{children}</Box>}

      <Copyright sx={copyrightSx} />
    </Box>
  );
}
