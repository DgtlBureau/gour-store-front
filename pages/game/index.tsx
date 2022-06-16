import React from 'react';
import { useRouter } from 'next/router';

import { LocalConfig } from 'hooks/useLocalTranslation';
import { GameLayout } from 'layouts/Game/Game';
import { GameMain } from 'components/Game/Main/Main';

export function Game() {
  const router = useRouter();

  const language: keyof LocalConfig =
    (router?.locale as keyof LocalConfig) || 'ru';

  const currency = 'cheeseCoin';

  return (
    <GameLayout currency={currency} language={language}>
      <GameMain />
    </GameLayout>
  );
}

export default Game;
