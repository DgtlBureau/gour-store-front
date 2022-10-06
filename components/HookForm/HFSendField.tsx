import React from 'react';

import { CircularProgress, Divider } from '@mui/material';

import { Box } from 'components/UI/Box/Box';
import { IconButton } from 'components/UI/IconButton/IconButton';

import SendIcon from '@mui/icons-material/Send';

import { HFTextField, HFTextFieldProps } from './HFTextField';

const sx = {
  divider: {
    height: 28,
    marginRight: '14px',
  },
  adornment: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
};

export type HFSendFieldProps = Omit<HFTextFieldProps, 'endAdornment'> & {
  isSending: boolean;
  sendingIsDisabled: boolean;
  onSend: () => void;
};

export function HFSendField({ isSending, sendingIsDisabled, onSend, ...props }: HFSendFieldProps) {
  return (
    <HFTextField
      endAdornment={
        <>
          <Divider sx={sx.divider} orientation='vertical' />

          <Box sx={sx.adornment}>
            {isSending ? (
              <CircularProgress size={30} />
            ) : (
              <IconButton disabled={sendingIsDisabled} onClick={onSend}>
                <SendIcon />
              </IconButton>
            )}
          </Box>
        </>
      }
      {...props}
    />
  );
}
