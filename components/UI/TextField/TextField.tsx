import React, { ChangeEventHandler, FocusEventHandler, KeyboardEventHandler, ReactElement } from 'react';

import { InputBaseProps, TextField as MUITextField, SxProps } from '@mui/material';

const helperTextSx = { margin: '3px 0 0 0', paddingLeft: '15px', width: '100%' };

type Props = {
  value?: unknown;
  id?: string;
  label?: string;
  sx?: SxProps;
  name?: string;
  variant?: 'standard' | 'outlined' | 'filled';
  disabled?: boolean;
  isError?: boolean;
  type?: string;
  helperText?: string;
  endAdornment?: ReactElement;
  multiline?: boolean;
  rows?: number;
  inputProps?: InputBaseProps['inputProps'];
  onChange?: ChangeEventHandler<HTMLInputElement>;
  onFocus?: FocusEventHandler<HTMLInputElement>;
  onBlur?: FocusEventHandler<HTMLInputElement>;
  onKeyDown?: KeyboardEventHandler<HTMLInputElement>;
};

export function TextField({
  value,
  id,
  sx,
  label,
  variant,
  type = 'text',
  disabled,
  isError,
  helperText,
  endAdornment,
  name,
  multiline,
  rows,
  inputProps,
  onChange,
  onFocus,
  onBlur,
  onKeyDown,
}: Props) {
  return (
    <MUITextField
      fullWidth
      sx={sx}
      label={label}
      value={value}
      disabled={disabled}
      error={isError}
      id={id}
      variant={variant}
      name={name}
      type={type}
      helperText={helperText}
      onChange={onChange}
      onFocus={onFocus}
      onBlur={onBlur}
      onKeyDown={onKeyDown}
      multiline={multiline}
      rows={rows}
      inputProps={{ ...inputProps }}
      InputProps={{ endAdornment }}
      FormHelperTextProps={{
        sx: helperTextSx,
      }}
    />
  );
}
