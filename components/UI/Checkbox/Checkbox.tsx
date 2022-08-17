import React from 'react';
import { Checkbox as MUICheckbox, SxProps } from '@mui/material';

import { Box } from '../Box/Box';
import { Typography } from '../Typography/Typography';

const boxSx = {
  display: 'flex',
};

const labelSx = {
  fontSize: '13px',
  marginLeft: '10px',
};

const checkSx = {
  alignItems: 'flex-start',
  padding: 0,
};

type Props = {
  defaultChecked?: boolean;
  disabled?: boolean;
  value?: boolean;
  label?: string;
  name?: string;
  sx?: SxProps;
  edge?: 'start' | 'end';
  tabIndex?: number;
  disableRipple?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export function Checkbox({
  defaultChecked,
  value,
  disabled,
  label,
  name,
  sx,
  edge,
  tabIndex,
  disableRipple,
  onChange,
}: Props) {
  return (
    <Box sx={{ ...boxSx, ...sx }}>
      <MUICheckbox
        sx={checkSx}
        name={name}
        defaultChecked={defaultChecked}
        disabled={disabled}
        checked={value}
        edge={edge}
        tabIndex={tabIndex}
        disableRipple={disableRipple}
        onChange={onChange}
      />
      {label && <Typography sx={labelSx}>{label}</Typography>}
    </Box>
  );
}
