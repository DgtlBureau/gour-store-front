import { NextRouter, useRouter } from 'next/router';
import React, { ReactNode, useCallback, useMemo } from 'react';

import { Currency } from 'types/entities/Currency';

import { Path } from 'constants/routes';
import { LocalConfig } from 'hooks/useLocalTranslation';

import { AppNavigationCtx, Navigation } from './NavigationContext';

type Props = { children: ReactNode };

function NavigationProvider({ children }: Props) {
  const router = useRouter() as NextRouter | null; // router может быть null в сторибуке

  const changeChapter = useCallback(
    (newPath: string, checkPaths = true) => {
      const needUpdate = !checkPaths || newPath !== router?.pathname;
      if (needUpdate) {
        router?.replace(newPath);
      }
    },
    [router?.pathname],
  );

  const goBack = useCallback(() => router?.back(), []);
  const goToHome = useCallback(() => router?.push(Path.HOME), []);
  const goToOrder = useCallback(() => router?.push(`/${Path.ORDER}`), []);

  const goToIntro = useCallback(() => router?.push(`/${Path.AUTH}`), []);
  const goToSignIn = useCallback(() => router?.push(`/${Path.AUTH}/${Path.SIGN_IN}`), []);
  const goToSignUp = useCallback(() => router?.push(`/${Path.AUTH}/${Path.SIGN_UP}`), []);

  const goToGame = useCallback(() => router?.push(`/${Path.GAME}`), []);
  const goToProductPage = useCallback((id: number) => router?.push(`/${Path.PRODUCTS}/${id}`), []);

  const goToCredentials = useCallback(() => router?.push(`/${Path.PERSONAL_AREA}/${Path.CREDENTIALS}`), []);
  const goToPayments = useCallback(() => router?.push(`/${Path.PERSONAL_AREA}/${Path.PAYMENTS}`), []);
  const goToAddresses = useCallback(() => router?.push(`/${Path.PERSONAL_AREA}/${Path.ADDRESSES}`), []);
  const goToDiscounts = useCallback(() => router?.push(`/${Path.PERSONAL_AREA}/${Path.DISCOUNTS}`), []);
  const goToOrders = useCallback(() => router?.push(`/${Path.PERSONAL_AREA}/${Path.ORDERS}`), []);

  const goToFavorites = useCallback(() => router?.push(`/${Path.FAVORITES}`), []);
  const goToBasket = useCallback(() => router?.push(`/${Path.BASKET}`), []);
  const goToPersonalArea = useCallback(() => router?.push(`/${Path.PERSONAL_AREA}`), []);

  const goToPromotionPage = useCallback((id: number) => router?.push(`/${Path.PROMOTIONS}/${id}`), []);

  const language: keyof LocalConfig = (router?.locale as keyof LocalConfig) || 'ru';

  const currency: Currency = 'cheeseCoin';

  const navigation = useMemo<Navigation>(
    () => ({
      changeChapter,
      goBack,
      goToHome,
      goToOrder,
      goToIntro,
      goToSignIn,
      goToSignUp,
      goToGame,
      goToProductPage,
      goToCredentials,
      goToPayments,
      goToAddresses,
      goToDiscounts,
      goToOrders,
      goToFavorites,
      goToBasket,
      goToPersonalArea,
      goToPromotionPage,
      language,
      currency,
      pathname: router?.pathname || '',
      query: router?.query || {},
      isReady: !!router?.isReady,
    }),
    [router?.pathname, router?.query, router?.isReady],
  );

  return <AppNavigationCtx.Provider value={navigation}>{children}</AppNavigationCtx.Provider>;
}

export default NavigationProvider;
