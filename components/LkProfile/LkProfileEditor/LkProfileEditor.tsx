import React from 'react';
import s from './LkProfileEditor.module.scss';
import translations from './LkProfileEditor.i18n.json';
import {useLocalTranslation} from "../../../hooks/useLocalTranslation";

export type LkProfileEditorProps = {
    user: {
        firstName: string;
        lastName: string;
        email: string;
        phone: string;
        referralCode: string;
    }
    onChangeEmail(): void;
    onChangePhone(): void;
    onChangePassword(): void;
    onSave(updatedUser: {
        firstName?: string;
        lastName?: string;
        referralCode?: string;
    }): void;
};

export function LkProfileEditor(props: LkProfileEditorProps) {
    const {t} = useLocalTranslation(translations);
    return <div>LkProfileEditor - {t('citySelectMessage')}</div>
}
