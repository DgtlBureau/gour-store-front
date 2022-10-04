import React, { FocusEventHandler, ReactElement } from 'react';
import { InputProps, SxProps } from '@mui/material';
import { Controller, useFormContext } from 'react-hook-form';
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
  } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue || ''}
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      render={({ field: { ref, onChange: HFOnChange, ...rest } }) => (
        <TextField
          {...rest}
          onChange={event => {
            const isInvalid = !checkValidity(event, regexp);
            if (isInvalid) {
              event.preventDefault();
              return;
            }
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
