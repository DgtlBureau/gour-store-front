import React, { useContext } from 'react';
import { NextRouter } from 'next/router';

import { LocalConfig } from 'hooks/useLocalTranslation';

export type Navigation = Pick<NextRouter, 'pathname' | 'query'> & {
  changeChapter: (path: string) => void;
  goBack: () => void;
  goToHome: () => void;
  goToOrder: () => void;
  goToIntro: () => void;
  goToSignIn: () => void;
  goToSignUp: () => void;
  goToGame: () => void;
  goToProductPage: (id: number) => void;
  goToCredentials: () => void;
  goToAddresses: () => void;
  goToDiscounts: () => void;
  goToOrders: () => void;
  goToFavorites: () => void;
  goToBasket: () => void;
  goToPersonalArea: () => void;
  goToReplenishment: () => void;
  goToPromotionPage: (id: number) => void;
  language: keyof LocalConfig;
};

export const AppNavigationCtx = React.createContext({} as Navigation);

const useAppNavigation = () => {
  const appNavigation = useContext(AppNavigationCtx);

  if (typeof appNavigation === 'undefined') {
    throw Error(`Use useAppNavigation() inside <NavigationProvider>`);
  }

  return appNavigation;
};

export default useAppNavigation;
