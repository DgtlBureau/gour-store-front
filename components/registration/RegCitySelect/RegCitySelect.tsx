import React from 'react';
import s from './RegCitySelect.module.scss';
import {useLocalTranslation} from "../../../hooks/useLocalTranslation";
import translations from './RegCitySelect.i18n.json';

export type RegCitySelectProps = {
    cities: {
        name: string;
        id: number;
    }[];
    onBack(): void;
    onSubmit(cityId: number): void;
};

export function RegCitySelect(props: RegCitySelectProps) {
    const {t} = useLocalTranslation(translations);
    return <div>RegCitySelect - {t('test')}</div>
}
