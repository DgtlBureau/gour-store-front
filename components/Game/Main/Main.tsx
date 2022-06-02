import React, { useState, useEffect } from 'react';

import { Button } from '../../UI/Button/Button';
import { GameFieldPosition } from '../Player/Player';
import { GameFrame as Frame } from '../Frame/Frame';
import { GamePlayer as Player } from '../Player/Player';

import buttonImage from '../../../assets/images/game/button.svg';

const sx = {
  btn: {
    background: `url("${buttonImage}")`,
    width: '78px',
    height: '78px',
    boxShadow: 'none',
    position: 'absolute',
    zIndex: 100,
    '&:hover': {
      boxShadow: 'none',
      backgroundColor: 'transparent',
      borderRadius: '45px',
    },
    '&:active': {
      borderRadius: '45px',
      opacity: '0.8',
      transform: 'translateY(3px)',
      boxShadow: '0 3px #666',
    }
  },

  isActive: {
    borderRadius: '45px',
    opacity: '0.8',
    transform: 'translateY(3px)',
    boxShadow: '0 3px #666',
  },

  topLeft: {
    top: '293px',
    left: '40px',
  },

  bottomLeft: {
    top: '399px',
    left: '40px',
  },

  topRight: {
    top: '293px',
    right: '40px',
  },

  bottomRight: {
    top: '399px',
    right: '40px',
  },
}

export function GameMain() {
  const [playerPosition, setPlayerPosition] = useState<GameFieldPosition>('topLeft');

  const topLeftBtn = document.getElementById('topLeftBtn');
  const bottomLeftBtn = document.getElementById('bottomLeftBtn');
  const topRightBtn = document.getElementById('topRightBtn');
  const bottomRightBtn = document.getElementById('bottomRightBtn');

  const moveToTopLeft = () => setPlayerPosition('topLeft');
  const moveToBottomLeft = () => setPlayerPosition('bottomLeft');
  const moveToTopRight = () => setPlayerPosition('topRight');
  const moveToBottomRight = () => setPlayerPosition('bottomRight');

  const changeOlegPosition = (e: KeyboardEvent) => {
    if (e.code === 'KeyQ') topLeftBtn?.click();
    if (e.code === 'KeyA') bottomLeftBtn?.click();
    if (e.code === 'KeyE') topRightBtn?.click();
    if (e.code === 'KeyD') bottomRightBtn?.click();
  };

  useEffect(() => {
    document.addEventListener("keydown", changeOlegPosition);

    return () => {
      document.removeEventListener("keydown", changeOlegPosition);
    }
  });

  return (
    <Frame>
      <Button id="topLeftBtn" type="submit" onClick={moveToTopLeft} sx={{...sx.btn, ...sx.topLeft}}/>
      <Button id="bottomLeftBtn" onClick={moveToBottomLeft} sx={{...sx.btn, ...sx.bottomLeft}}/>
      <Button id="topRightBtn" onClick={moveToTopRight} sx={{...sx.btn, ...sx.topRight}}/>
      <Button id="bottomRightBtn" onClick={moveToBottomRight} sx={{...sx.btn, ...sx.bottomRight}}/>
      <Player position={playerPosition} />
    </Frame>
  );
}
