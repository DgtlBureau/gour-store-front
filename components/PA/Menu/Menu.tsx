import React from 'react';

import { Box } from '../../UI/Box/Box';
import { Typography } from '../../UI/Typography/Typography';

const sx = {
  menu: {
    display: 'flex',
    flexDirection: {
      md: 'row',
      xs: 'column',
    },
    alignItems: {
      md: 'center',
      xs: 'flex-start',
    },
    justifyContent: {
      md: 'space-between',
      xs: 'center',
    },
    margin: '40px 0 60px 0',
  },
  list: {
    display: 'flex',
    alignItems: 'center',
    width: {
      xs: '100%',
      md: 'fit-content',
    },
    margin: {
      xs: '20px 0 0 0',
      md: 0,
    },
  },
  listItem: {
    padding: '10px 16px',
    color: 'text.muted',
    borderRadius: '6px',
    cursor: 'pointer',

    transition: 'all 0.2s ease',

    '&:hover': {
      backgroundColor: 'secondary.main',
      color: 'text.primary',
    },
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

export type PAMenuProps = {
  active: string;
  menuList: MenuItem[];
  onChange: (path: string) => void;
};

export function PAMenu({ active, menuList, onChange }: PAMenuProps) {
  const currentChapter = menuList.find(it => it.path === active);

  return (
    <Box sx={sx.menu}>
      <Typography variant="h4" sx={sx.title}>
        {currentChapter?.label}
      </Typography>

      <Box sx={sx.list}>
        {menuList.map(link => (
          <Typography
            key={link.path}
            variant="body1"
            sx={{ ...sx.listItem, ...(link.path === active && sx.active) }}
            onClick={() => onChange(link.path)}
          >
            {link.label}
          </Typography>
        ))}
      </Box>
    </Box>
  );
}
