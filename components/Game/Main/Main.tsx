import React, { useState, useEffect } from 'react';

import { PlayerPosition } from "../Player/Player";

export function GameMain() {
  const [currentOlegPosition, setCurrentOlegPosition] = useState<PlayerPosition>(PlayerPosition.topLeft);

  const moveToUpLeft = () => setCurrentOlegPosition(PlayerPosition.topLeft);
  const moveToDownLeft = () => setCurrentOlegPosition(PlayerPosition.bottomLeft);
  const moveToUpRight = () => setCurrentOlegPosition(PlayerPosition.topRight);
  const moveToDownRight = () => setCurrentOlegPosition(PlayerPosition.bottomRight);

  const changeOlegPosition = (e: KeyboardEvent) => {
    if (e.code === 'KeyQ') moveToUpLeft();
    if (e.code === 'KeyA') moveToDownLeft();
    if (e.code === 'KeyE') moveToUpRight();
    if (e.code === 'KeyD') moveToDownRight();
  };

  useEffect(() => {
    document.addEventListener("keydown", changeOlegPosition);

    return () => {
      document.removeEventListener("keydown", changeOlegPosition);
    }
  });

  return <div>{currentOlegPosition}</div>
}
