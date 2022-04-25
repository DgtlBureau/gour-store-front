import React, {
  ChangeEventHandler,
  CSSProperties,
  FocusEventHandler,
} from 'react';
import MUITextareaAutosize from '@mui/material/TextareaAutosize';

type Props = {
  name?: string;
  maxRows?: number;
  minRows?: number;
  sx?: CSSProperties;
  defaultValue?: string | number | readonly string[] | undefined;
  value?: string | number | readonly string[] | undefined;
  placeholder?: string | undefined;
  onChange: ChangeEventHandler<HTMLTextAreaElement>;
  onBlur?: ChangeEventHandler<HTMLTextAreaElement>;
  onFocus?: FocusEventHandler<HTMLTextAreaElement>;
};

export function Textarea({
  name,
  maxRows,
  minRows = 1,
  sx,
  value,
  defaultValue,
  placeholder,
  onChange,
  onBlur,
  onFocus,
}: Props) {
  return (
    <MUITextareaAutosize
      name={name}
      onChange={onChange}
      onBlur={onBlur}
      onFocus={onFocus}
      maxRows={maxRows}
      minRows={minRows}
      style={{ ...sx }}
      value={value}
      defaultValue={defaultValue}
      placeholder={placeholder}
    />
  );
}
