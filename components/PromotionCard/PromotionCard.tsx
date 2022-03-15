import React from 'react';
import s from './PromotionCard.module.scss';

export type PromotionCardProps = {
    image: string;
    onClickMore(): void;
};

export function PromotionCard(props: PromotionCardProps) {
    return <div>PromotionCard</div>
}
