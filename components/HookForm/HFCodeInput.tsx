import React, { CSSProperties, FocusEventHandler } from 'react';
import { InputProps, SxProps } from '@mui/material';
import { Controller, useFormContext } from 'react-hook-form';
import { InputModeTypes } from 'react-code-input';
import { TextField } from '../UI/TextField/TextField';
import { CodeInput } from '../UI/CodeInput/CodeInput';

type Props = {
  name: string;
  sx?: CSSProperties;
  value?: string;
  defaultValue?: string;
  disabled?: boolean;
  fieldsCount?: number;
  type?: 'number' | 'text' | 'password' | 'tel' | undefined;
  inputMode?: InputModeTypes;
  onChange?: (value: string) => void;
};

export function HFCodeInput({ name, defaultValue, onChange, ...props }: Props) {
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
        <CodeInput
          {...rest}
          onChange={(value) => {
            HFOnChange(value);
            onChange?.(value);
          }}
          {...props}
        />
      )}
    />
  );
}
