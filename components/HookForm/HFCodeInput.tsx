import React, { CSSProperties } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { InputModeTypes } from 'react-code-input';
import { CodeInput } from 'components/UI/CodeInput/CodeInput';

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
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue || ''}
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      render={({ field: { ref, onChange: HFOnChange, ...rest } }) => (
        <CodeInput
          {...rest}
          onChange={value => {
            HFOnChange(value);
            onChange?.(value);
          }}
          {...props}
        />
      )}
    />
  );
}
