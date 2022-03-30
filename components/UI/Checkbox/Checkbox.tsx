import React from 'react';
import { Checkbox as MUICheckbox, SxProps } from '@mui/material';

import { Box } from '../../UI/Box/Box';
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
  checked?: boolean;
  label?: string;
  sx?: SxProps;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export function Checkbox({
  defaultChecked,
  checked,
  disabled,
  label,
  sx,
  onChange,
}: Props) {
  return (
    <Box sx={{ ...boxSx, ...sx }}>
      <MUICheckbox
        sx={checkSx}
        defaultChecked={defaultChecked}
        disabled={disabled}
        checked={checked}
        onChange={onChange}
      />
      {label && <Typography sx={labelSx}>{label}</Typography>}
    </Box>
  );
}
