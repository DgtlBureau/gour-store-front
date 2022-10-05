import React, { FocusEventHandler, ReactElement } from 'react';
import { Controller, useFormContext } from 'react-hook-form';

import { InputProps, SxProps } from '@mui/material';

import { TextField } from 'components/UI/TextField/TextField';

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
  endAdornment?: ReactElement;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  regexp?: RegExp;
  inputProps?: Record<string, number>;
  rows?: number;
  onBlur?: FocusEventHandler<HTMLInputElement>;
};

const checkValidity = (event: React.ChangeEvent<HTMLInputElement>, regex?: RegExp): boolean => {
  if (!regex) return true;

  return new RegExp(regex).test(event.currentTarget.value);
};

export function HFTextField({ name, defaultValue, helperText, onChange, regexp, ...props }: HFTextFieldProps) {
  const {
    control,
    formState: { errors },
    clearErrors,
  } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue || ''}
      render={({ field: { ref: _ref, onChange: HFOnChange, ...rest } }) => (
        <TextField
          {...rest}
          onChange={event => {
            const isValid = checkValidity(event, regexp);

            if (!isValid) {
              event.preventDefault();
              return;
            }

            clearErrors(name);

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
