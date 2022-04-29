import React from 'react';
import s from './RegSecondIntro.module.scss';
import translations from './RegSecondIntro.i18n.json';
import {useLocalTranslation} from "../../../hooks/useLocalTranslation";

export type RegSecondIntroProps = {
    onNext(): void;
    onBack(): void;
};

export function RegSecondIntro(props: RegSecondIntroProps) {
    const {t} = useLocalTranslation(translations);
    return <div>RegSecondIntro - {t('citySelectMessage')}</div>
}
