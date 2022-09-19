import React, { useState } from 'react';

import { GameLayout } from 'layouts/Game/Game';
import { useAppNavigation } from 'components/Navigation';
import { GameMain } from 'components/Game/Main/Main';
import { GameRulesModal } from 'components/Game/RulesModal/RulesModal';
import { PrivateLayout } from 'layouts/Private/Private';

export function Game() {
  const { currency, language } = useAppNavigation();

  const [rulesModalIsOpen, setRulesModalIsOpen] = useState(true);

  const openRulesModal = () => setRulesModalIsOpen(true);
  const closeRulesModal = () => setRulesModalIsOpen(false);

  return (
    // <PrivateLayout>
    <GameLayout currency={currency} language={language}>
      <GameMain onHelpClick={openRulesModal} />

      <GameRulesModal isOpen={rulesModalIsOpen} onAccept={closeRulesModal} />
    </GameLayout>
    // </PrivateLayout>
  );
}

export default Game;
