import React from 'react';
import s from './LkOrderProfileItem.module.scss';
import translations from './LkOrderProfileItem.i18n.json';
import {useLocalTranslation} from "../../../hooks/useLocalTranslation";

type OrderProfile = {
    title: string;
    cityId: number;
    street: string;
    house: string;
    apartment: string;
    entrance: string;
    floor: string;
    isMain: boolean;
}

export type LkOrderProfileItemProps = {
    isOpened: boolean;
    orderProfile: OrderProfile
    cities: {
        label: string;
        value: string;
    }[];
    onClick(): void;
    onClose(): void;
    onSave(orderProfile: OrderProfile): void;
    onRemove(): void;
};

export function LkOrderProfileItem(props: LkOrderProfileItemProps) {
    const {t} = useLocalTranslation(translations);
    return <div>LkOrderProfileItem - {t('citySelectMessage')}</div>
}
