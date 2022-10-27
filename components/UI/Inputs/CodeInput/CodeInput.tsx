import { CSSProperties, ChangeEvent, KeyboardEvent, useEffect, useState } from 'react';

import { SxProps } from '@mui/material';

import { Box } from 'components/UI/Box/Box';
import { Typography } from 'components/UI/Typography/Typography';

import regexp from 'constants/regex';
import { color } from 'themes';

import inputSx from './CodeInput.styles';

const BACKSPACE_KEY = 'Backspace';
const LEFT_ARROW_KEY = 'ArrowLeft';
const RIGHT_ARROW_KEY = 'ArrowRight';
const UP_ARROW_KEY = 'ArrowUp';
const DOWN_ARROW_KEY = 'ArrowDown';

type CodeInputField = {
  id: string;
  value: string;
};

export type CodeInputProps = {
  value?: string;
  fieldsCount?: number;
  type?: 'number' | 'text';
  helperText?: string;
  disabled?: boolean;
  isError?: boolean;
  sx?: SxProps;
  onChange(value: string): void;
};

export function CodeInput({
  value,
  fieldsCount = 4,
  type = 'number',
  helperText,
  disabled,
  isError,
  sx,
  onChange,
}: CodeInputProps) {
  const [fields, setFields] = useState<CodeInputField[]>([]);

  const isNumberType = type === 'number';

  const inputType = isNumberType ? 'text' : type;

  const getFieldsValue = () => fields.map(field => field.value).join('');

  useEffect(() => {
    const fieldsValue = getFieldsValue();

    if (fieldsValue === value) return;

    const splittedValue = value?.split('');

    const updatedFields: CodeInputField[] = [];

    for (let i = 0; i < fieldsCount; i++) {
      const updatedField = {
        id: i.toString(),
        value: splittedValue?.[i] || '',
      };

      updatedFields.push(updatedField);
    }

    setFields(updatedFields);
  }, [value]);

  const focusNext = (current: HTMLInputElement) => {
    const next = current.nextElementSibling as HTMLInputElement;

    if (next) next.focus();
  };

  const focusPrev = (current: HTMLInputElement) => {
    const prev = current.previousElementSibling as HTMLInputElement;

    if (prev) prev.focus();
  };

  const change = (inputId: string, inputValue: string) => {
    const currentFieldId = fields.findIndex(field => field.id === inputId);

    if (currentFieldId === -1) return;

    const updatedField = { id: inputId, value: inputValue };

    fields.splice(currentFieldId, 1, updatedField);

    const updatedValue = getFieldsValue();

    onChange(updatedValue);
  };

  const erase = (current: HTMLInputElement) => {
    if (!current.value) {
      focusPrev(current);
      return;
    }

    change(current.id, '');
  };

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    const inputId = e.currentTarget.id;

    const inputValue = e.currentTarget.value;

    const isDigit = inputValue.match(regexp.onlyDigits);

    if (isNumberType && !isDigit) {
      e.currentTarget.value = '';
      return;
    }

    change(inputId, inputValue);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    const current = e.currentTarget;

    switch (e.key) {
      case BACKSPACE_KEY:
        erase(current);
        break;

      case LEFT_ARROW_KEY:
        e.preventDefault();
        focusPrev(current);
        break;

      case RIGHT_ARROW_KEY:
        e.preventDefault();
        focusNext(current);
        break;

      case UP_ARROW_KEY:
        e.preventDefault();
        break;

      case DOWN_ARROW_KEY:
        e.preventDefault();
        break;

      default:
        if (current.value) focusNext(current);
        break;
    }
  };

  const inputStyle = {
    ...inputSx.field,
    borderColor: isError ? color.error : 'lightgray',
    outlineColor: isError ? color.error : color.primary,
  } as CSSProperties;

  const helperTextColor = isError ? color.error : undefined;

  return (
    <Box sx={sx}>
      <Box sx={inputSx.fieldList}>
        {fields.map(field => (
          <input
            id={field.id}
            key={field.id}
            disabled={disabled}
            type={inputType}
            maxLength={1}
            onKeyDown={handleKeyDown}
            onInput={handleInput}
            style={inputStyle}
          />
        ))}
      </Box>

      {!!helperText && (
        <Typography variant='caption' color={helperTextColor} sx={inputSx.helperText}>
          {helperText}
        </Typography>
      )}
    </Box>
  );
}
