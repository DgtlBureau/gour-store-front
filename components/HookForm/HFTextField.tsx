import React, { FocusEventHandler } from 'react';
import { InputProps, SxProps } from '@mui/material';
import { Controller, useFormContext } from 'react-hook-form';
import { TextField } from '../UI/TextField/TextField';

export type HFTextFieldProps = {
  name: string;
  defaultValue?: string;
  multiline?: boolean;
  label?: string;
  helperText?: string;
  type?: string;
  sx?: SxProps;
  disabled?: boolean;
  InputProps?: InputProps;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  rows?: number;
  onBlur?: FocusEventHandler<HTMLInputElement>;
};

export function HFTextField({ name, defaultValue, helperText, onChange, ...props }: HFTextFieldProps) {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue || ''}
      render={({ field: { ref, onChange: HFOnChange, ...rest } }) => (
        <TextField
          {...rest}
          onChange={event => {
            HFOnChange(event);
            onChange?.(event);
          }}
          isError={!!errors[name]}
          helperText={helperText || errors[name]?.message}
          {...props}
        />
      )}
    />
  );
}
