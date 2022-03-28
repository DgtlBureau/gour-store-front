import React from 'react';
import s from './RegFavoriteInfo.module.scss';
import translations from './RegFavoriteInfo.i18n.json';
import {useLocalTranslation} from "../../../hooks/useLocalTranslation";

export type RegFavoriteInfoProps = {
    onBack(): void;
    countries: {
        image: string;
        title: string;
        id: number;
    }[];
    products: {
        image: string;
        title: string;
        id: number;
    }[];
    onSubmit(info: {
        countries: number[];
        products: number[];
    }): void;
};

export function RegFavoriteInfo(props: RegFavoriteInfoProps) {
    const {t} = useLocalTranslation(translations);
    return <div>RegFavoriteInfo - {t('test')}</div>
}
