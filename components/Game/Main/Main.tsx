import Image from 'next/image';
import React, { useEffect, useMemo, useState } from 'react';

import { Box } from 'components/UI/Box/Box';
import { Button } from 'components/UI/Button/Button';
import { Typography } from 'components/UI/Typography/Typography';

import { NotificationType } from 'types/entities/Notification';

import { dispatchNotification } from 'packages/EventBus';

import heartIcon from 'assets/icons/heart.svg';

import { GameAlarm as Alarm } from '../Alarm/Alarm';
import { GameCounter as Counter } from '../Counter/Counter';
import { GameFrame as Frame } from '../Frame/Frame';
import { GameLives as Lives } from '../Lives/Lives';
import { GamePlayer as Player } from '../Player/Player';
import { GameProduct as Product } from '../Product/Product';
import { GameCore, GameEvent } from './Core';
import sx from './Main.styles';

const DEFAULT_ANGLES = {
  1: 0,
  2: 60,
  3: 120,
};

const JAMON_ANGLES = {
  1: -15,
  2: 100,
  3: -100,
};

export type GameMainProps = {
  onHelpClick(): void;
  isLivesLoading: boolean;
  onEndGame: () => Promise<void>;
  lives: number;
};

export function GameMain({ onHelpClick, onEndGame, isLivesLoading, lives }: GameMainProps) {
  const [gameState, setGameState] = useState({} as GameEvent);

  const changeGameState = (e: GameEvent) => {
    setGameState(e);

    if (!e.isPlaying) {
      onEndGame();
    }
  };

  const game = useMemo(() => new GameCore(changeGameState), []);

  const moveToTopLeft = () => game.setPlayerPosition('topLeft');
  const moveToBottomLeft = () => game.setPlayerPosition('bottomLeft');
  const moveToTopRight = () => game.setPlayerPosition('topRight');
  const moveToBottomRight = () => game.setPlayerPosition('bottomRight');

  const changeOlegPosition = (e: KeyboardEvent) => {
    if (e.code === 'KeyQ') moveToTopLeft();
    if (e.code === 'KeyA') moveToBottomLeft();
    if (e.code === 'KeyE') moveToTopRight();
    if (e.code === 'KeyD') moveToBottomRight();
  };

  const start = () => {
    if (isLivesLoading) {
      dispatchNotification('Получение доступных жизней', { type: NotificationType.INFO });
      return;
    }
    if (lives < 1) {
      dispatchNotification('Пополните жизни в магазине', { type: NotificationType.INFO });
      return;
    }

    if (game.isNowPlaying) {
      dispatchNotification('Игра уже запущена', { type: NotificationType.DANGER });
    } else {
      game.start();
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', changeOlegPosition);

    return () => {
      document.removeEventListener('keydown', changeOlegPosition);
    };
  });

  return (
    <Frame>
      <Button onClick={moveToTopLeft} sx={{ ...sx.controlBtn, ...sx.topLeftBtn }} />
      <Button onClick={moveToBottomLeft} sx={{ ...sx.controlBtn, ...sx.bottomLeftBtn }} />
      <Button onClick={moveToTopRight} sx={{ ...sx.controlBtn, ...sx.topRightBtn }} />
      <Button onClick={moveToBottomRight} sx={{ ...sx.controlBtn, ...sx.bottomRightBtn }} />

      <Box sx={sx.helpBtn}>
        <Button onClick={onHelpClick} sx={sx.smallBtn} />

        <Typography variant='body2' sx={sx.btnText}>
          ПОМОЩЬ
        </Typography>
      </Box>

      <Box sx={sx.startBtn}>
        <Button onClick={start} sx={sx.smallBtn} />

        <Typography variant='body2' sx={sx.btnText}>
          СТАРТ
        </Typography>

        <Box sx={sx.userLives}>
          <Typography variant='body1'>{lives}</Typography>&nbsp;
          <Image src={heartIcon} width={20} height={20} />
        </Box>
      </Box>

      <Alarm sx={sx.alarm} isRinging={gameState.isRabbitShown && !!gameState.lives} />

      <Lives sx={sx.gameLives} value={gameState.lives} />

      <Counter sx={sx.counter} value={gameState.score} />

      <Player sx={sx.player} position={gameState.playerPosition} />

      <Product
        sx={sx.firstCheese}
        isActive={gameState.products?.cheese === 1}
        type='cheese'
        angle={DEFAULT_ANGLES[1]}
      />
      <Product
        sx={sx.secondCheese}
        isActive={gameState.products?.cheese === 2}
        type='cheese'
        angle={DEFAULT_ANGLES[2]}
      />
      <Product
        sx={sx.thirdCheese}
        isActive={gameState.products?.cheese === 3}
        type='cheese'
        angle={DEFAULT_ANGLES[3]}
      />

      <Product
        sx={sx.firstSausage}
        isActive={gameState.products?.sausage === 1}
        type='sausage'
        angle={DEFAULT_ANGLES[1]}
      />
      <Product
        sx={sx.secondSausage}
        isActive={gameState.products?.sausage === 2}
        type='sausage'
        angle={DEFAULT_ANGLES[2]}
      />
      <Product
        sx={sx.thirdSausage}
        isActive={gameState.products?.sausage === 3}
        type='sausage'
        angle={DEFAULT_ANGLES[3]}
      />

      <Product sx={sx.firstJamon} isActive={gameState.products?.jamon === 1} type='jamon' angle={JAMON_ANGLES[1]} />
      <Product sx={sx.secondJamon} isActive={gameState.products?.jamon === 2} type='jamon' angle={JAMON_ANGLES[2]} />
      <Product sx={sx.thirdJamon} isActive={gameState.products?.jamon === 3} type='jamon' angle={JAMON_ANGLES[3]} />

      <Product
        sx={sx.firstChicken}
        isActive={gameState.products?.chicken === 1}
        type='chicken'
        angle={DEFAULT_ANGLES[1]}
      />
      <Product
        sx={sx.secondChicken}
        isActive={gameState.products?.chicken === 2}
        type='chicken'
        angle={DEFAULT_ANGLES[2]}
      />
      <Product
        sx={sx.thirdChicken}
        isActive={gameState.products?.chicken === 3}
        type='chicken'
        angle={DEFAULT_ANGLES[3]}
      />
    </Frame>
  );
}
