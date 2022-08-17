import React, { ReactNode } from 'react';
import { Modal as MUIModal } from '@mui/material';

import CrossIcon from '@mui/icons-material/Clear';

import translations from './Modal.i18n.json';
import { useLocalTranslation } from '../../../hooks/useLocalTranslation';
import { Box } from '../Box/Box';
import { Button } from '../Button/Button';
import { IconButton } from '../IconButton/IconButton';
import { Typography } from '../Typography/Typography';

import sx from './Modal.styles';

export type ModalProps = {
  isOpen: boolean;
  title: string;
  description?: string;
  children?: ReactNode;
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
  children,
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
        <Box sx={sx.head}>
          <Typography sx={sx.title} variant='h6' color='primary'>
            {title}
          </Typography>

          <IconButton onClick={onClose}>
            <CrossIcon color='primary' />
          </IconButton>
        </Box>

        {!!description && <Typography variant='body1'>{description}</Typography>}

        {children}

        {onAccept ? (
          <Button sx={sx.acceptBtn} onClick={onAccept} disabled={acceptIsDisabled}>
            {acceptText || t('acceptText')}
          </Button>
        ) : (
          !!formId && (
            <Button sx={sx.acceptBtn} type='submit' form={formId} disabled={acceptIsDisabled}>
              {acceptText || t('acceptText')}
            </Button>
          )
        )}
      </Box>
    </MUIModal>
  );
}
