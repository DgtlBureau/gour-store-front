import React from 'react';
import s from './LkProfileAvatarEditor.module.scss';
import translations from './LkProfileAvatarEditor.i18n.json';
import { useLocalTranslation } from 'hooks/useLocalTranslation';

export type LkProfileAvatarEditorProps = {
    image: string;
    onChange(): void;
    onClose(): void;
};

export function LkProfileAvatarEditor(props: LkProfileAvatarEditorProps) {
    const {t} = useLocalTranslation(translations);
    return <div>LkProfileAvatarEditor - {t('citySelectMessage')}</div>
}