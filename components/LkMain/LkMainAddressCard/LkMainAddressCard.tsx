import React from 'react';
import s from './LkMainAddressCard.module.scss';
import translations from './LkMainAddressCard.i18n.json';
import {useLocalTranslation} from "../../../hooks/useLocalTranslation";

export type LkMainAddressCardProps = {
    addresses: string[];
    onClickMore(): void;
};

export function LkMainAddressCard(props: LkMainAddressCardProps) {
    const {t} = useLocalTranslation(translations);
    return <div>LkMainAddressCard - {t('citySelectMessage')}</div>
}
