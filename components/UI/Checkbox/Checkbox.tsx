import React, { ReactElement } from 'react';

import { Checkbox as MUICheckbox, InputLabel as MUIInputLabel, SxProps } from '@mui/material';

import { Box } from '../Box/Box';

const boxSx = {
  display: 'flex',
  alignItems: 'center',
};

const labelSx = {
  fontSize: '13px',
  marginLeft: '10px',
  cursor: 'pointer',
};

const checkSx = {
  alignItems: 'flex-start',
  padding: 0,
};

type Props = {
  id?: string;
  defaultChecked?: boolean;
  disabled?: boolean;
  value?: boolean;
  label?: string | ReactElement;
  name?: string;
  sx?: SxProps;
  edge?: 'start' | 'end';
  tabIndex?: number;
  disableRipple?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export function Checkbox({
  id = Date.now().toString(),
  defaultChecked,
  value,
  disabled,
  label,
  name = 'checkbox',
  sx,
  edge,
  tabIndex,
  disableRipple,
  onChange,
}: Props) {
  return (
    <Box sx={{ ...boxSx, ...sx }}>
      <MUICheckbox
        id={id}
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
      {label && (
        <MUIInputLabel htmlFor={id} sx={labelSx}>
          {label}
        </MUIInputLabel>
      )}
    </Box>
  );
}
