import React, { ReactNode } from 'react';
import { RadioGroup, SxProps } from '@mui/material';
import { Controller, useFormContext } from 'react-hook-form';

type Props = {
  name: string;
  defaultValue?: string;
  sx?: SxProps;
  children: ReactNode;
};

export function HFRadioGroup({ name, defaultValue, sx, children }: Props) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue || false}
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      render={({ field: { ref, ...rest } }) => (
        <RadioGroup {...rest} row name={name} sx={sx}>
          {children}
        </RadioGroup>
      )}
    />
  );
}
