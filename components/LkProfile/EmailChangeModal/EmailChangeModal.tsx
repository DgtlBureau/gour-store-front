import React from 'react';
import s from './EmailChangeModal.module.scss';
import translations from './EmailChangeModal.i18n.json';
import {useLocalTranslation} from "../../../hooks/useLocalTranslation";

export type EmailChangeModalProps = {
    isOpened: boolean;
    onClose(): void;
    onChange(email: string): void;
};

export function EmailChangeModal(props: EmailChangeModalProps) {
    const {t} = useLocalTranslation(translations);
    return <div>PasswordChangeModal - {t('citySelectMessage')}</div>
}
