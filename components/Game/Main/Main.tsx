import React, { useState, useEffect } from 'react';

import { PlayerPosition } from "../Oleg/Oleg";

export function GameMain() {
  const [currentOlegPosition, setCurrentOlegPosition] = useState<PlayerPosition>(PlayerPosition.topLeft);

  const moveToUpLeft = () => setCurrentOlegPosition(PlayerPosition.topLeft);
  const moveToDownLeft = () => setCurrentOlegPosition(PlayerPosition.bottomLeft);
  const moveToUpRight = () => setCurrentOlegPosition(PlayerPosition.topRight);
  const moveToDownRight = () => setCurrentOlegPosition(PlayerPosition.bottomRight);

  const changeOlegPosition = (keyCode: string) => {
    if (keyCode === 'KeyQ') moveToUpLeft();
    if (keyCode === 'KeyA') moveToDownLeft();
    if (keyCode === 'KeyE') moveToUpRight();
    if (keyCode === 'KeyD') moveToDownRight();
  };

  useEffect(() => {
    document.addEventListener("keydown", e => changeOlegPosition(e.code));

    return () => {
      document.removeEventListener("keydown", e => changeOlegPosition(e.code));
    }
  });

  return <div>{currentOlegPosition}</div>
}
