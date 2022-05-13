import React, {ReactElement} from 'react';

import translations from './Lk.i18n.json';
import {useLocalTranslation} from "../../hooks/useLocalTranslation";

export type LkLayoutProps = {
    children: ReactElement;
};

export function LkLayout(props: LkLayoutProps) {
    const {t} = useLocalTranslation(translations);
    return <div>LkLayout - {t('citySelectMessage')}</div>
}
