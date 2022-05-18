import React, { ReactElement } from 'react';
import s from './LkMenu.module.scss';
import translations from './LkMenu.i18n.json';
import { useLocalTranslation } from '../../../hooks/useLocalTranslation';

export type LkMenuProps = {
  title: string;
  isActive: boolean;
};

export function LkMenu({ title, isActive }: LkMenuProps) {
  const { t } = useLocalTranslation(translations);
  return (
    <span className={`${s.lkMenuItem} ${isActive ? s.active : ''}`}>
      {title}
    </span>
  );
}
