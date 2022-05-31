import React, { useState } from 'react';

import { PlayerPosition } from "../GameOleg/GameOleg";

export type GameMainProps = {};

export function GameMain({}: GameMainProps) {
  const [currentOlegPosition, setCurrentOlegPosition] = useState<PlayerPosition>(PlayerPosition.topLeft);
  return <div>GameMain</div>
}
