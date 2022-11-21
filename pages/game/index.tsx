import React, { useState } from 'react';

import { useGetCurrentUserQuery, useReduceGameLiveMutation } from 'store/api/currentUserApi';

import { GameLayout } from 'layouts/Game/Game';
import { PrivateLayout } from 'layouts/Private/Private';

import { GameMain } from 'components/Game/Main/Main';
import { GameRulesModal } from 'components/Game/RulesModal/RulesModal';

import { NotificationType } from 'types/entities/Notification';

import { dispatchNotification } from 'packages/EventBus';

export function Game() {
  const { data: currentUser, isFetching: isUserFetching } = useGetCurrentUserQuery();
  const [reduceGameLive, { isLoading: isReduceGameLiveLoading }] = useReduceGameLiveMutation();

  const [rulesModalIsOpen, setRulesModalIsOpen] = useState(false);

  const openRulesModal = () => setRulesModalIsOpen(true);
  const closeRulesModal = () => setRulesModalIsOpen(false);

  const onEndGame = async () => {
    try {
      await reduceGameLive().unwrap();
    } catch {
      dispatchNotification('Произошла ошибка', { type: NotificationType.DANGER });
    }
  };

  return (
    <PrivateLayout>
      <GameLayout>
        <GameMain
          onHelpClick={openRulesModal}
          isLivesLoading={isUserFetching || isReduceGameLiveLoading}
          onEndGame={onEndGame}
          lives={currentUser?.lives ?? 0}
        />

        <GameRulesModal isOpen={rulesModalIsOpen} onAccept={closeRulesModal} />
      </GameLayout>
    </PrivateLayout>
  );
}

export default Game;
