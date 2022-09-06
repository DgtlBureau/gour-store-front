import React, { FocusEventHandler, ReactNode } from 'react';
import { SxProps } from '@mui/material';
import { Controller, useFormContext } from 'react-hook-form';
import { PhoneInput } from 'components/UI/PhoneInput/PhoneInput';

type Props = {
  name: string;
  defaultValue?: string;
  multiline?: boolean;
  label?: string;
  helperText?: string;
  disabled?: boolean;
  type?: string;
  sx?: SxProps;
  endAdornment?: ReactNode;
  rows?: number;
  onBlur?: FocusEventHandler<HTMLInputElement>;
};

export function HFPhoneInput({ name, defaultValue, helperText, ...props }: Props) {
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
      render={({ field: { ref, ...rest } }) => (
        <PhoneInput {...rest} isError={!!errors[name]} helperText={helperText || errors[name]?.message} {...props} />
      )}
    />
  );
}
