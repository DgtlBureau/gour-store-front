import React, { useState } from 'react';

import { GameLayout } from 'layouts/Game/Game';
import { PrivateLayout } from 'layouts/Private/Private';

import { GameMain } from 'components/Game/Main/Main';
import { GameRulesModal } from 'components/Game/RulesModal/RulesModal';
import { useAppNavigation } from 'components/Navigation';

export function Game() {
  const { currency, language } = useAppNavigation();

  const [rulesModalIsOpen, setRulesModalIsOpen] = useState(false);

  const openRulesModal = () => setRulesModalIsOpen(true);
  const closeRulesModal = () => setRulesModalIsOpen(false);

  return (
    <PrivateLayout>
      <GameLayout currency={currency} language={language}>
        <GameMain onHelpClick={openRulesModal} />

        <GameRulesModal isOpen={rulesModalIsOpen} onAccept={closeRulesModal} />
      </GameLayout>
    </PrivateLayout>
  );
}

export default Game;
