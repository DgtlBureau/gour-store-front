import React, { ChangeEventHandler, FocusEventHandler, ReactElement } from 'react';

import { TextField as MUITextField, SxProps } from '@mui/material';

type Props = {
  value?: unknown;
  id?: string;
  label?: string;
  sx?: SxProps;
  name?: string;
  variant?: 'standard' | 'outlined' | 'filled' | undefined;
  isError?: boolean;
  type?: string;
  helperText?: string;
  endAdornment?: ReactElement;
  multiline?: boolean;
  rows?: number;
  inputProps?: Record<string, number>;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  onFocus?: FocusEventHandler<HTMLInputElement>;
  onBlur?: FocusEventHandler<HTMLInputElement>;
};

export function TextField({
  value,
  id,
  sx,
  label,
  variant,
  type = 'text',
  isError,
  helperText,
  endAdornment,
  name,
  onChange,
  onFocus,
  onBlur,
  ...props
}: Props) {
  return (
    <MUITextField
      fullWidth
      sx={sx}
      label={label}
      value={value}
      error={isError}
      id={id}
      variant={variant}
      onChange={onChange}
      name={name}
      onFocus={onFocus}
      onBlur={onBlur}
      type={type}
      helperText={helperText}
      InputProps={{ endAdornment }}
      {...props}
    />
  );
}
