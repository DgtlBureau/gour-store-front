import { NextRouter } from 'next/router';
import React, { useContext } from 'react';

import { Currency } from 'types/entities/Currency';

import { LocalConfig } from 'hooks/useLocalTranslation';

export type Navigation = Pick<NextRouter, 'pathname' | 'query'> & {
  changeChapter: (path: string, checkPaths?: boolean) => void;
  goBack: () => void;
  goToHome: () => void;
  goToOrder: () => void;
  goToIntro: () => void;
  goToSignIn: () => void;
  goToSignUp: () => void;
  goToGame: () => void;
  goToProductPage: (id: number) => void;
  goToCredentials: () => void;
  goToPayments: () => void;
  goToAddresses: () => void;
  goToDiscounts: () => void;
  goToOrders: () => void;
  goToFavorites: () => void;
  goToBasket: () => void;
  goToPersonalArea: () => void;
  goToPromotionPage: (id: number) => void;
  language: keyof LocalConfig;
  currency: Currency;
};

export const AppNavigationCtx = React.createContext({} as Navigation);

const useAppNavigation = () => {
  const appNavigation = useContext(AppNavigationCtx);

  if (typeof appNavigation === 'undefined') {
    throw Error('Use useAppNavigation() inside <NavigationProvider>');
  }

  return appNavigation;
};

export default useAppNavigation;
