import React from 'react';

import { SxProps } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import MUISelect, { SelectChangeEvent } from '@mui/material/Select';

import { Box } from '../Box/Box';
import { Typography } from '../Typography/Typography';

export type SelectOption = {
  value: string | number;
  label?: string;
};

type Props = {
  onChange: (value: string | number) => void;
  value?: string | number;
  error?: string;
  isError?: boolean;
  options: SelectOption[];
  isDisabled?: boolean;
  label?: string;
  sx?: SxProps;
  selectSx?: SxProps;
};

export function Select({ value, options, error, isError, label, sx, selectSx, isDisabled, onChange }: Props) {
  const isNumberValue = typeof value === 'number';

  const change = (event: SelectChangeEvent) => {
    const selectValue = event.target.value;
    onChange(isNumberValue ? +selectValue : selectValue);
  };

  return (
    <Box sx={{ minWidth: 120, ...sx }}>
      <FormControl fullWidth>
        <InputLabel id='select-label'>{label}</InputLabel>
        <MUISelect
          labelId='select-label'
          id='select'
          sx={selectSx}
          value={isNumberValue ? value.toString() : value}
          label={label}
          error={isError}
          disabled={isDisabled}
          onChange={change}
        >
          {options.map(option => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </MUISelect>
      </FormControl>
      {error && (
        <Typography variant='body2' color='error'>
          {error}
        </Typography>
      )}
    </Box>
  );
}
