import React, { CSSProperties } from 'react';
import dynamic from 'next/dynamic';

const ReactCodeInput = dynamic(
  () => import('react-code-input')
) as unknown as React.FunctionComponent<ReactCodeInputProps>;

import { defaultTheme } from '../../../themes';
import { InputModeTypes, ReactCodeInputProps } from 'react-code-input';

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

type Props = {
  name: string;
  sx?: CSSProperties;
  value?: string;
  disabled?: boolean;
  fieldsCount?: number;
  type?: 'number' | 'text' | 'password' | 'tel' | undefined;
  inputMode?: InputModeTypes;
  onChange: (value: string) => void;
};

export const CodeInput = ({
  name,
  sx,
  value,
  disabled,
  fieldsCount = 4,
  type = 'text',
  inputMode = 'numeric',
  onChange,
}: Props) => {
  return (
    <ReactCodeInput
      style={sx}
      disabled={disabled}
      name={name}
      value={value}
      onChange={onChange}
      type={type}
      fields={fieldsCount}
      inputMode={inputMode}
      inputStyle={inputSx as CSSProperties}
    />
  );
};
