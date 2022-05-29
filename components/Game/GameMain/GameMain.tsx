import React, {useState} from 'react';
import s from './GameMain.module.scss';
import {PlayerPosition} from "../GameOleg/GameOleg";

export type GameMainProps = {};

export function GameMain({}: GameMainProps) {
    const [currentOlegPosition, setCurrentOlegPosition] = useState<PlayerPosition>(PlayerPosition.topLeft);
    return <div>GameMain</div>
}
