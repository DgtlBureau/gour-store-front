import React, { FocusEventHandler } from 'react';
import { SxProps } from '@mui/material';
import { Controller, useFormContext } from 'react-hook-form';
import { TextField } from '../UI/TextField/TextField';

type Props = {
  name: string;
  defaultValue?: string;
  multiline?: boolean;
  label?: string;
  helperText?: string;
  type?: string;
  sx?: SxProps;
  onBlur?: FocusEventHandler<HTMLInputElement>;
};

export function HFTextField({ name, defaultValue, helperText, ...props }: Props) {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue || ''}
      render={({ field: { ref, ...rest } }) => (
        <TextField
          {...rest}
          isError={!!errors[name]}
          helperText={helperText || errors[name]?.message}
          {...props}
        />
      )}
    />
  );
}
