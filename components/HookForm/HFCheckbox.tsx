import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';

import { SxProps } from '@mui/material';

import { Checkbox } from 'components/UI/Checkbox/Checkbox';

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
      render={({ field: { ref: _ref, ...rest } }) => <Checkbox {...rest} name={name} sx={sx} label={label} />}
    />
  );
}
