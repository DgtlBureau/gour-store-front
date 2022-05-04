import React, { CSSProperties } from 'react';
import ReactCodeInput, { InputModeTypes } from 'react-code-input';

import { defaultTheme } from '../../../themes';

const inputSx = {
  border: '1px solid lightgrey',
  borderRadius: '4px',
  margin: '4px',
  paddingLeft: '8px',
  width: '36px',
  height: '42px',
  fontSize: '32px',
  boxSizing: 'border-box',
  color: defaultTheme.palette.text.primary,
  outlineColor: defaultTheme.palette.primary.main,
};

export type CodeInputProps = {
  name: string;
  sx?: CSSProperties;
  value?: string;
  fieldsCount?: number;
  type?: 'number' | 'text' | 'password' | 'tel' | undefined;
  inputMode?: InputModeTypes;
  onChange: (value: string) => void;
};

export function CodeInput({
  name,
  sx,
  value,
  onChange,
  fieldsCount = 4,
  type = 'text',
  inputMode = 'numeric',
}: CodeInputProps) {
  return (
    <ReactCodeInput
      style={sx}
      name={name}
      value={value}
      onChange={onChange}
      type={type}
      fields={fieldsCount}
      inputMode={inputMode}
      inputStyle={inputSx as CSSProperties}
    />
  );
}
