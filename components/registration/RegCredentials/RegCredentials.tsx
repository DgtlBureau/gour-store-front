import React from 'react';
import s from './RegCredentials.module.scss';
import translations from './RegCredentials.i18n.json';
import {useLocalTranslation} from "../../../hooks/useLocalTranslation";

export type RegCredentialsProps = {
    cities: {
        name: string;
        id: number;
    }[];
    onSendMessageCode(): void;
    onBack(): void;
    onSubmit(info: {
        type: 'physical'|'organization'|'procurementOrganizer';
        phone: string;
        password: string;
        referralCode: string;
    }): void;
};

export function RegCredentials(props: RegCredentialsProps) {
    const {t} = useLocalTranslation(translations);
    return <div>RegCredentials - {t('test')}</div>
}
