import { FormControlLabel, SxProps } from '@mui/material';

import { IOption } from 'types/entities/IOption';

import { Box } from '../Box/Box';
import { RadioButton } from '../RadioButton/RadioButton';

export type RadioGroupProps = {
  selected: IOption['value'];
  options: IOption[];
  sx?: SxProps;
  onChange: (value: IOption['value']) => void;
};

export function RadioGroup({ selected, options, sx, onChange }: RadioGroupProps) {
  return (
    <Box sx={sx}>
      {options.map(option => (
        <FormControlLabel
          key={option.value}
          checked={selected === option.value}
          value={option.value}
          control={<RadioButton />}
          label={option.label}
          onChange={() => onChange(option.value)}
        />
      ))}
    </Box>
  );
}
