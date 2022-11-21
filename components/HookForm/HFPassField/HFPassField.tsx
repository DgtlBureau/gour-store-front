import React, { useState } from 'react';

import { Divider } from '@mui/material';

import { IconButton } from 'components/UI/IconButton/IconButton';

import { HFTextField, HFTextFieldProps } from '../HFTextField';

import sx from './HFPassField.styles';

import ClosedEye from '@mui/icons-material/VisibilityOffOutlined';
import OpenedEye from '@mui/icons-material/VisibilityOutlined';

export type HFPassFieldProps = Omit<HFTextFieldProps, 'type' | 'multiline' | 'rows'>;

export function HFPassField(props: HFPassFieldProps) {
  const [eyeIsOpen, setEyeIsOpen] = useState(false);

  const toggleEye = () => setEyeIsOpen(!eyeIsOpen);

  return (
    <HFTextField
      type={eyeIsOpen ? 'text' : 'password'}
      endAdornment={
        <>
          <Divider sx={sx.divider} orientation='vertical' />
          <IconButton onClick={toggleEye}>{eyeIsOpen ? <ClosedEye /> : <OpenedEye />}</IconButton>
        </>
      }
      {...props}
    />
  );
}
