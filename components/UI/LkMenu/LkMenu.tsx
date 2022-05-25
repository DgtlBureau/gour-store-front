import React from 'react';
import { Stack } from '@mui/material';

import { Typography } from './../Typography/Typography';

const sx = {
  menu: {
    margin: '40px 0 60px 0',
  },
  menuItem: {
    padding: '10px 16px',
    color: 'text.muted',
    borderRadius: '6px',
    cursor: 'pointer',

    transition: 'all 0.2s ease',
  
    '&:hover': {
      backgroundColor: 'secondary.main',
      color: 'text.primary',
    }
  },
  active: {
    backgroundColor: 'secondary.main',
    color: 'text.primary',
  },
  title: {
    fontFamily: 'Roboto slab',
    fontWeight: 'bold',
    color: 'primary.main',
  },
};

export type MenuItem = {
  label: string;
  path: string;
};

export type LkMenuProps = {
  active: string;
  menuList: MenuItem[];
  onChange: (path: string) => void;
};

export function LkMenu({ active, menuList, onChange }: LkMenuProps) {
  const currentChapter = menuList.find(it => it.path === active);

  return (
    <Stack direction="row" alignItems="center" justifyContent="space-between" sx={sx.menu}>
      <Typography variant="h4" sx={sx.title}>{currentChapter?.label}</Typography>

      <Stack direction="row" alignItems="center" spacing={2}>
        {
          menuList.map(link => (
            <Typography
              key={link.path}
              variant="body1"
              sx={{ ...sx.menuItem, ...((link.path === active) && sx.active) }}
              onClick={() => onChange(link.path)}
            >
              {link.label}
            </Typography>
          ))
        }
      </Stack>
    </Stack>
  );
}
