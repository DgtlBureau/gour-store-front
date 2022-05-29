import React from 'react';
import s from './GameOleg.module.scss';

export enum PlayerPosition {
    topLeft = 'topLeft',
    topRight = 'topRight',
    bottomLeft = 'bottomLeft',
    bottomRight = 'bottomRight',
}

export type GameOlegProps = {
    position: PlayerPosition
};

export function GameOleg(props: GameOlegProps) {
    return <div>GameOleg</div>
}
