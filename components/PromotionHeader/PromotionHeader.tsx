import React from 'react';
import s from './PromotionHeader.module.scss';

export type PromotionHeaderProps = {
    title: string;
    image: string;
    end: Date;
};

export function PromotionHeader(props: PromotionHeaderProps) {
  return <div>PromotionHeader</div>;
}
