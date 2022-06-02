import React from 'react';
import s from './GameProduct.module.scss';

export enum GameProductType {
    cheese = 'cheese',
    sausage = 'sausage',
    jamon = 'jamon',
    chicken = 'chicken',
}

export type GameProductProps = {
    type: GameProductType;
    tiltAngle: number;
};

export function GameProduct(props: GameProductProps) {
    return <div>GameProduct</div>
}
