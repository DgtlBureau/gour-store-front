import React, { ReactNode } from 'react';

import { ToggleButton as MUIToggleButton, SxProps } from '@mui/material';

const toggleSx = {
  minWidth: '24px',
  padding: '8px 16px',
  backgroundColor: 'secondary.main',
  color: 'text.muted',
  border: 'none',
  '&:hover': {
    backgroundColor: 'secondary.main',
  },
  '&.Mui-selected': {
    backgroundColor: 'primary.main',
    color: 'common.white',
  },
  '&.Mui-selected:hover': {
    backgroundColor: 'primary.main',
    color: 'common.white',
  },
};

export type ToggleButtonProps = {
  selected: boolean;
  children: ReactNode;
  sx?: SxProps;
  onChange(): void;
};

export function ToggleButton({ selected, children, sx, onChange }: ToggleButtonProps) {
  return (
    <MUIToggleButton
      value='check'
      selected={selected}
      sx={{ ...toggleSx, textTransform: 'none', ...sx }}
      onClick={onChange}
    >
      {children}
    </MUIToggleButton>
  );
}
