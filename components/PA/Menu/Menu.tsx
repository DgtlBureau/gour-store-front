import React from 'react';

import { Box } from 'components/UI/Box/Box';
import { Typography } from 'components/UI/Typography/Typography';

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
    width: '100%',
    margin: {
      xs: '20px 0 25px 0',
      sm: '40px 0 60px 0',
    },
  },
  list: {
    display: 'flex',
    alignItems: 'center',
    paddingBottom: '15px',
    width: {
      xs: '100%',
      md: 'fit-content',
    },
    margin: {
      xs: '10px 0 0 0',
      sm: '20px 0 0 0',
    },
    overflowX: 'auto',
  },
  listItem: {
    whiteSpace: 'nowrap',
    marginRight: '10px',
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
    fontSize: {
      sm: '40px',
      xs: '24px',
    },
    fontFamily: 'Roboto slab',
    fontWeight: 'bold',
    color: 'text.secondary',
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
      <Typography variant='h4' sx={sx.title}>
        {currentChapter?.label}
      </Typography>

      <Box sx={sx.list}>
        {menuList.map(link => (
          <Typography
            key={link.path}
            variant='body1'
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
