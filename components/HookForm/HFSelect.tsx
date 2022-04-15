import React from 'react';
import { SxProps } from '@mui/material';
import { Controller, useFormContext } from 'react-hook-form';

import { Box } from '../UI/Box/Box';
import { Select, SelectOption } from '../UI/Select/Select';

type Props<V> = {
  name: string;
  placeholder: string;
  options: SelectOption<V>[];
  defaultValue?: SelectOption<V>['value'];
  type?: string;
  label?: string;
  sx?: SxProps;
};

export function HFSelect<V>({ name, defaultValue, sx, ...props }: Props<V>) {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <Box sx={sx}>
      <Controller
        name={name}
        control={control}
        defaultValue={defaultValue || ''}
        render={({ field: { ref, onChange, ...rest } }) => (
          <Select
            {...rest}
            isMulti={false}
            onChange={newValue => onChange(newValue?.value)}
            isError={!!errors[name]}
            error={errors[name]?.message ?? ''}
            {...props}
          />
        )}
      />
    </Box>
  );
}