import React, { useState } from 'react';

import { useGetCurrentUserQuery } from 'store/api/currentUserApi';

import { GameLayout } from 'layouts/Game/Game';
import { PrivateLayout } from 'layouts/Private/Private';

import { GameMain } from 'components/Game/Main/Main';
import { GameRulesModal } from 'components/Game/RulesModal/RulesModal';
import { useAppNavigation } from 'components/Navigation';

export function Game() {
  const { data: currentUser, refetch: refetchCurrentUser, isFetching: isUserFetching } = useGetCurrentUserQuery();
  const { currency, language } = useAppNavigation();

  const [rulesModalIsOpen, setRulesModalIsOpen] = useState(false);

  const openRulesModal = () => setRulesModalIsOpen(true);
  const closeRulesModal = () => setRulesModalIsOpen(false);

  const onEndGame = async () => {
    // TODO: отправить запрос на уменьшение жизней
    refetchCurrentUser();
  };

  return (
    <PrivateLayout>
      <GameLayout currency={currency} language={language}>
        <GameMain
          onHelpClick={openRulesModal}
          isLivesLoading={isUserFetching}
          onEndGame={onEndGame}
          lives={currentUser?.lives ?? 0}
        />

        <GameRulesModal isOpen={rulesModalIsOpen} onAccept={closeRulesModal} />
      </GameLayout>
    </PrivateLayout>
  );
}

export default Game;
