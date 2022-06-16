import React, { ReactNode} from 'react';
import { SxProps } from '@mui/material';

import { Button } from '../Button/Button';

const toggleSx = {
  minWidth: '24px',
  padding: '6px 12px',
  backgroundColor: 'secondary.main',
  color: 'text.muted',
  boxShadow: 'none',
  'text-transform': 'none',
};

const activeToggleSx = {
  backgroundColor: 'primary.main',
  color: 'common.white',
};

export type ToggleButtonProps = {
  selected: boolean;
  children: ReactNode;
  sx?: SxProps
  onChange(): void;
}

export function ToggleButton({
  selected,
  children,
  sx,
  onChange,
}: ToggleButtonProps) {
  return (
    <Button
      sx={{ ...toggleSx, ...sx, ...(selected && activeToggleSx)}}
      onClick={onChange}
    >
      {children}
    </Button>
  );
}
