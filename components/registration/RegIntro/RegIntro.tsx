import React from 'react';
import s from './RegIntro.module.scss';
import translations from './RegIntro.i18n.json';
import {useLocalTranslation} from "../../../hooks/useLocalTranslation";

export type RegIntroProps = {
    onClickRegistration(): void;
    onClickAuth(): void;
};

export function RegIntro(props: RegIntroProps) {
    const {t} = useLocalTranslation(translations);
    return <div>RegIntro - {t('test')}</div>
}
