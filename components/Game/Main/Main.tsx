import React, { useState, useEffect } from 'react';

import { PlayerPosition } from "../Oleg/Oleg";

export function GameMain() {
  const [currentOlegPosition, setCurrentOlegPosition] = useState<PlayerPosition>(PlayerPosition.topLeft);

  const changeOlegPosition = (e: KeyboardEvent) => {
    const keyCode = e.code;
    
    if (keyCode === 'KeyQ') setCurrentOlegPosition(PlayerPosition.topLeft);
    if (keyCode === 'KeyA') setCurrentOlegPosition(PlayerPosition.bottomLeft);
    if (keyCode === 'KeyE') setCurrentOlegPosition(PlayerPosition.topRight);
    if (keyCode === 'KeyD') setCurrentOlegPosition(PlayerPosition.bottomRight);
  };

  useEffect(() => {
    document.addEventListener("keydown", changeOlegPosition);

    return () => {
      document.removeEventListener("keydown", changeOlegPosition);
    }
  }, [])

  return <div>{currentOlegPosition}</div>
}
