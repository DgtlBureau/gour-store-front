import React from 'react';
import cheese from '../../../assets/images/game/cheese.svg'
import chicken from  '../../../assets/images/game/chicken.svg'
import sausage from  '../../../assets/images/game/sausage.svg'
import jamon from  '../../../assets/images/game/jamon.svg'

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

const checkItem = (props:string) => {
    switch (props) {
        case 'cheese':
            return cheese;
        case 'sausage':
            return sausage;
        case 'jamon':
            return jamon;
        case 'chicken':
            return chicken;
        default:
            return '';
    }
};

export function GameProduct(props: GameProductProps) {
    return <img src={checkItem(props.type)} alt="item" style={{transform: `rotate(${props.tiltAngle}deg)`, transition: "transform 0.5s ease"}}/>
}
