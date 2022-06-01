import React from 'react';
import Image from 'next/image';
import s from './GameProduct.module.scss';

import cheese from '../../../assets/images/game/cheese.svg';
import chicken from '../../../assets/images/game/chicken.svg';
import sausage from '../../../assets/images/game/sausage.svg';
import jamon from '../../../assets/images/game/jamon.svg';


export type GameProductProps = {
    type: 'cheese' | 'sausage' | 'jamon' | 'chicken';
    isActive: boolean;
    step: 'first' | 'second' | 'third' | 'four';
};

const checkItem = (props: string) => {
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

const checkStep = (props:string) => {
    switch (props) {
        case 'first':
            return s.firstStep;
        case 'second':
            return s.secondStep;
        case 'third':
            return s.thirdStep;
        case 'four':
            return s.fourStep;
        default:
            return '';
    }
}

export function GameProduct(props: GameProductProps) {
    return <Image src={checkItem(props.type)}
           alt="item"
           width="100%"
           height="100%"
           className={(props.isActive ? s.elementActive : s.elementDisabled) + ' ' + (checkStep(props.step))}
    />
}
