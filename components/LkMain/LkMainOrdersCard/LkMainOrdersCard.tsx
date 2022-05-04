import React from 'react';
import s from './LkMainOrdersCard.module.scss';
import translations from './LkMainOrdersCard.i18n.json';
import {useLocalTranslation} from "../../../hooks/useLocalTranslation";

export type LkMainOrdersCardProps = {
    orders: {
        id: string;
        date: Date;
        status: string;
        sum: number;
        currency: 'rub' | 'eur';
    }
    onClickMore(): void;
};

export function LkMainOrdersCard(props: LkMainOrdersCardProps) {
    const {t} = useLocalTranslation(translations);
    return <div>LkMainOrdersCard - {t('citySelectMessage')}</div>
}
