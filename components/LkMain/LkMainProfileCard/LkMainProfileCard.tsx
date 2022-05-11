import React from 'react';
import s from './LkMainProfileCard.module.scss';
import translations from './LkMainProfileCard.i18n.json';
import {useLocalTranslation} from "../../../hooks/useLocalTranslation";

export type LkMainProfileCardProps = {
    name: string;
    email: string;
    photo: string;
    onClickMore(): void;
};

export function LkMainProfileCard(props: LkMainProfileCardProps) {
    const {t} = useLocalTranslation(translations);
    return <div>LkMainProfileCard - {t('citySelectMessage')}</div>
}
