import React from 'react';
import s from './LkMenu.module.scss';
import translations from './LkMenu.i18n.json';
import {useLocalTranslation} from "../../../hooks/useLocalTranslation";

export type LkMenuProps = {};

export function LkMenu(props: LkMenuProps) {
    const {t} = useLocalTranslation(translations);
    return <div>LkMenu - {t('citySelectMessage')}</div>
}
