import React, { ReactElement } from 'react';
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
  active: string;
  menuList: MenuItem[];
  onItemClick: (path: string) => void;
};

export function LkMenu({ active, menuList, onItemClick }: LkMenuProps) {
  const { t } = useLocalTranslation(translations);
  return (
    <Stack direction="row" alignItems="center" justifyContent="space-between">
      <Typography>{active}</Typography>
      <Stack direction="row" spacing={2}>
        {menuList.map(link => (
          <Button
            key={link.path}
            variant={link.label === active ? 'contained' : 'text'}
            onClick={() => onItemClick(link.path)}
          >
            {link.label}
          </Button>
        ))}
      </Stack>
    </Stack>
  );
}
