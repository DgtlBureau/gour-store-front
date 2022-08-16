/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useMemo, PropsWithChildren } from 'react';
import { useRouter } from 'next/router';

import { Path } from 'constants/routes';
import { AppNavigationCtx } from './NavigationContext';
import { LocalConfig } from 'hooks/useLocalTranslation';

const NavigationProvider = ({ children }: PropsWithChildren<{}>) => {
  const router = useRouter();

  const changeChapter = useCallback(
    (newPath: string) => newPath !== router?.pathname && router.push(newPath),
    [router?.pathname]
  );

  const goBack = useCallback(() => router.back(), []);
  const goToHome = useCallback(() => router.push(Path.HOME), []);
  const goToOrder = useCallback(() => router.push('/order'), []);

  const goToIntro = useCallback(() => router.push(`/${Path.AUTH}`), []);
  const goToSignIn = useCallback(() => router.push(`/${Path.AUTH}/${Path.SIGN_IN}`), []);
  const goToSignUp = useCallback(() => router.push(`/${Path.AUTH}/${Path.SIGN_UP}`), []);

  const goToGame = useCallback(() => router.push(`/${Path.GAME}`), []);
  const goToProductPage = useCallback((id: number) => router.push(`/${Path.PRODUCTS}/${id}`), []);

  const goToCredentials = useCallback(() => router.push(`/${Path.PERSONAL_AREA}/${Path.CREDENTIALS}`), []);
  const goToAddresses = useCallback(() => router.push(`/${Path.PERSONAL_AREA}/${Path.ADDRESSES}`), []);
  const goToDiscounts = useCallback(() => router.push(`/${Path.PERSONAL_AREA}/${Path.DISCOUNTS}`), []);
  const goToOrders = useCallback(() => router.push(`/${Path.PERSONAL_AREA}/${Path.ORDERS}`), []);

  const goToFavorites = useCallback(() => router.push(`/${Path.FAVORITES}`), []);
  const goToBasket = useCallback(() => router.push(`/${Path.BASKET}`), []);
  const goToPersonalArea = useCallback(() => router.push('/personal-area'), []);
  const goToReplenishment = useCallback(() => router.push('/replenishment'), []);

  const goToPromotionPage = useCallback((id: number) => router.push(`/${Path.PROMOTIONS}/${id}`), []);

  const language: keyof LocalConfig = (router?.locale as keyof LocalConfig) || 'ru';

  const navigation = useMemo(
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
      goToAddresses,
      goToDiscounts,
      goToOrders,
      goToFavorites,
      goToBasket,
      goToPersonalArea,
      goToReplenishment,
      goToPromotionPage,
      language,
      pathname: router?.pathname,
      query: router?.query,
    }),
    [router]
  );

  return <AppNavigationCtx.Provider value={navigation}>{children}</AppNavigationCtx.Provider>;
};

export default NavigationProvider;
