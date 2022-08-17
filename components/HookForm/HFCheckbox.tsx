import React, { ReactNode } from 'react';
import { RadioGroup, SxProps } from '@mui/material';
import { Controller, useFormContext } from 'react-hook-form';
import { Checkbox } from '../UI/Checkbox/Checkbox';

type Props = {
  name: string;
  label?: string;
  defaultValue?: boolean;
  sx?: SxProps;
};

export function HFCheckbox({ name, defaultValue = false, sx, label }: Props) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue}
      render={({ field: { ref, ...rest } }) => <Checkbox {...rest} name={name} sx={sx} label={label} />}
    />
  );
}
