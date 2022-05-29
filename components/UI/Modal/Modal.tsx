import React, { ReactNode } from 'react';
import { Modal as MUIModal } from '@mui/material';

import CrossIcon from '@mui/icons-material/Clear';

import translations from './Modal.i18n.json';
import { useLocalTranslation } from '../../../hooks/useLocalTranslation';
import { Box } from '../Box/Box';
import { Button } from '../Button/Button';
import { IconButton } from '../IconButton/IconButton';
import { Typography } from '../Typography/Typography';

const sx = {
  modal: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    maxWidth: '520px',
    padding: '60px',
    bgcolor: 'background.default',
  },
  title: {
    fontFamily: 'Roboto slab',
    fontWeight: 'bold',
    marginBottom: '14px',
  },
  acceptBtn: {
    width: '100%',
    marginTop: '14px',
  },
  cross: {
    position: 'absolute',
    top: '30px',
    right: '52px',
  }
};

export type ModalProps = {
  isOpen: boolean;
  title: string;
  description?: string;
  body?: ReactNode;
  actions?: ReactNode;
  acceptText?: string;
  formId?: string;
  acceptIsDisabled?: boolean; 
  onAccept?: () => void;
  onClose: () => void;
};

export function Modal({
  isOpen,
  title,
  description,
  body,
  acceptText,
  formId,
  acceptIsDisabled, 
  onAccept,
  onClose,
}: ModalProps) {
  const { t } = useLocalTranslation(translations);

  return (
    <MUIModal open={isOpen} onClose={onClose}>
      <Box sx={sx.modal}>
        <IconButton sx={sx.cross} onClick={onClose}>
          <CrossIcon color="primary" />
        </IconButton>
        
        <Typography sx={sx.title} variant="h6" color="primary">
          {title}
        </Typography>
        {
          !!description && (
            <Typography variant="body1">
              {description}
            </Typography>
          )
        }
        {body}
        {
          onAccept ? (
            <Button sx={sx.acceptBtn} onClick={onAccept} disabled={acceptIsDisabled}>
              {acceptText || t('acceptText')}
            </Button>
          ) : (
            !!formId && (
              <Button sx={sx.acceptBtn} type="submit" form={formId} disabled={acceptIsDisabled}>
                {acceptText || t('acceptText')}
              </Button>
            )
          )
        }
      </Box>
    </MUIModal>
  );
}
