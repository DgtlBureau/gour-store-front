import React, {ReactNode} from 'react';
import translations from './BaseInformationCard.i18n.json';
import {useLocalTranslation} from "../../../hooks/useLocalTranslation";

export type BaseInformationCardProps = {
    title: string;
    footerText: string;
    onMoreClick(): void;
    children: ReactNode;
};

export function BaseInformationCard(props: BaseInformationCardProps) {
    const {t} = useLocalTranslation(translations);
    return <div>BaseInformationCard - {t('citySelectMessage')}</div>
}
