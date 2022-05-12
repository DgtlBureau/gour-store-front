import React from 'react';
import s from './PhoneChangeModal.module.scss';
import translations from './PhoneChangeModal.i18n.json';
import {useLocalTranslation} from "../../../hooks/useLocalTranslation";

export type PhoneChangeModalProps = {
    isOpened: boolean;
    onClose(): void;
    onSendCode(phone: string): void;
    onSubmit(changePhoneDto: {
        phone: string;
        code: number;
    }): void;
};

export function PhoneChangeModal(props: PhoneChangeModalProps) {
    const {t} = useLocalTranslation(translations);
    return <div>PhoneChangeModal - {t('citySelectMessage')}</div>
}
