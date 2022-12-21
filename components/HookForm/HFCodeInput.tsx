import React, { CSSProperties } from 'react';
import { Controller, useFormContext } from 'react-hook-form';

import { CodeInput } from 'components/UI/Inputs/CodeInput/CodeInput';

type Props = {
  name: string;
  sx?: CSSProperties;
  value?: string;
  defaultValue?: string;
  disabled?: boolean;
  fieldsCount?: number;
  type?: 'number' | 'text';
  helperText?: string;
  isError?: boolean;
  onChange?: (value: string) => void;
};

export function HFCodeInput({ name, defaultValue, helperText, onChange, ...props }: Props) {
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
        <CodeInput
          {...rest}
          onChange={value => {
            clearErrors(name);

            HFOnChange(value);
            onChange?.(value);
          }}
          isError={!!errors[name]}
          helperText={helperText || errors[name]?.message}
          {...props}
        />
      )}
    />
  );
}
