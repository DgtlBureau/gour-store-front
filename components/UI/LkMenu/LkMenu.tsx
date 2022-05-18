import React from 'react';
import s from './LkMenu.module.scss';
import translations from './LkMenu.i18n.json';
import { useLocalTranslation } from '../../../hooks/useLocalTranslation';
import { Stack } from '@mui/material';
import { Button } from '../Button/Button';
import { Typography } from './../Typography/Typography';

export type MenuItem = {
  label: string;
  path: string;
};

export type LkMenuProps = {
  title: string;
  active: string;
  menuList: MenuItem[];
  onItemClick: (path: string) => void;
};

export function LkMenu({ title, active, menuList, onItemClick }: LkMenuProps) {
  const { t } = useLocalTranslation(translations);
  return (
    <Stack direction="row" alignItems="center" justifyContent="space-between">
      <Typography>{title}</Typography>
      <Stack direction="row" alignItems="center" spacing={2}>
        {menuList.map(link => (
          <span
            key={link.path}
            className={`${s.lkMenuItem} ${
              link.label === active ? s.active : ''
            }`}
            onClick={() => onItemClick(link.path)}
          >
            {link.label}
          </span>
        ))}
      </Stack>
    </Stack>
  );
}
