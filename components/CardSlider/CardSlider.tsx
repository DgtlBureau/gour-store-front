import React, {ReactElement} from 'react';
import s from './CardSlider.module.scss';

export type CardSliderProps = {
    title?: string;
    isMobile: boolean;
    cards: ReactElement[];
    cols: number;
    rows: number;
};

export function CardSlider(props: CardSliderProps) {
    return <div>CardSlider</div>
}
