import React from 'react';

import { GameLayout } from 'layouts/Game/Game';
import { useAppNavigation } from 'components/Navigation';
import { GameMain } from 'components/Game/Main/Main';
import { PrivateLayout } from 'layouts/Private/Private';

export function Game() {
  const { currency, language } = useAppNavigation();

  return (
    <PrivateLayout>
      <GameLayout currency={currency} language={language}>
        <GameMain />
      </GameLayout>
    </PrivateLayout>
  );
}

export default Game;
