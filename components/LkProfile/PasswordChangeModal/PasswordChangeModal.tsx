import React from 'react';
import s from './PasswordChangeModal.module.scss';
import translations from './PasswordChangeModal.i18n.json';
import {useLocalTranslation} from "../../../hooks/useLocalTranslation";

export type PasswordChangeModalProps = {
    isOpened: boolean;
    onClose(): void;
    onChange(email: string): void;
};

export function PasswordChangeModal(props: PasswordChangeModalProps) {
    const {t} = useLocalTranslation(translations);
    return <div>PasswordChangeModal - {t('citySelectMessage')}</div>
}
