import React from 'react';
import s from './LkOrdersCard.module.scss';
import translations from './LkOrdersCard.i18n.json';
import {useLocalTranslation} from "../../../hooks/useLocalTranslation";
import {Currency} from "../../../@types/entities/Currency";

export type LkOrdersCardProps = {
    isOpened: boolean;
    title: string;
    status: string;
    createdAt: Date;
    address: string;
    client: string;
    currency: Currency;
    products: {
      photo: string;
      title: string;
      weight: number;
      amount: number;
      cost: number;
    }[];
    promotions: {
       title: string;
       amount: number;
    }[];
    deliveryCost: number;
};

export function LkOrdersCard(props: LkOrdersCardProps) {
    const {t} = useLocalTranslation(translations);
    return <div>LkOrdersCard - {t('citySelectMessage')}</div>
}
