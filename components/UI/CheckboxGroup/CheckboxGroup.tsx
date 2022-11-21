import { Checkbox, FormControlLabel, SxProps } from '@mui/material';

import { IOption } from 'types/entities/IOption';

import { Box } from '../Box/Box';

export type CheckboxGroupProps = {
  selected: IOption['value'][];
  options: IOption[];
  sx?: SxProps;
  onChange: (value: IOption['value']) => void;
};

export function CheckboxGroup({ selected, options, sx, onChange }: CheckboxGroupProps) {
  return (
    <Box sx={sx}>
      {options.map(option => (
        <FormControlLabel
          checked={selected.includes(option.value)}
          value={option.value}
          control={<Checkbox />}
          label={option.label}
          onChange={() => onChange(option.value)}
        />
      ))}
    </Box>
  );
}
