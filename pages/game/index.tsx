import React from 'react';
import { useRouter } from 'next/router';

import { LocalConfig } from 'hooks/useLocalTranslation';
import { GameLayout } from 'layouts/Game/Game';
import { GameMain } from 'components/Game/Main/Main';
import { PrivateLayout } from 'layouts/Private/Private';

export function Game() {
  const router = useRouter();

  const language: keyof LocalConfig = (router?.locale as keyof LocalConfig) || 'ru';

  const currency = 'cheeseCoin';

  return (
    <PrivateLayout>
      <GameLayout currency={currency} language={language}>
        <GameMain />
      </GameLayout>
    </PrivateLayout>
  );
}

export default Game;
