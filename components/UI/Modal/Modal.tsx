import React, { ReactNode } from 'react';

import { Modal as MUIModal } from '@mui/material';

import { useLocalTranslation } from 'hooks/useLocalTranslation';

import CrossIcon from '@mui/icons-material/Clear';

import { Box } from '../Box/Box';
import { Button } from '../Button/Button';
import { IconButton } from '../IconButton/IconButton';
import { Typography } from '../Typography/Typography';
import translations from './Modal.i18n.json';
import sx from './Modal.styles';

export type ModalProps = {
  isOpen: boolean;
  title: string | JSX.Element;
  description?: string;
  children?: ReactNode;
  acceptText?: string | JSX.Element;
  refuseText?: string;
  showRefuseButton?: true;
  formId?: string;
  acceptIsDisabled?: boolean;
  closeIsDisabled?: boolean;
  onAccept?: () => void;
  onClose?: () => void;
};

export function Modal({
  isOpen,
  title,
  description,
  children,
  acceptText,
  refuseText,
  showRefuseButton,
  formId,
  acceptIsDisabled,
  closeIsDisabled,
  onAccept,
  onClose,
}: ModalProps) {
  const { t } = useLocalTranslation(translations);

  const titleIsString = typeof title === 'string';

  const showControlBlock = !!onAccept || !!formId;

  return (
    <MUIModal open={isOpen} onClose={onClose}>
      <Box sx={sx.modal}>
        <Box sx={sx.head}>
          {titleIsString ? (
            <Typography sx={sx.title} variant='h6' color='primary'>
              {title}
            </Typography>
          ) : (
            title
          )}

          {!!onClose && (
            <IconButton onClick={onClose} disabled={closeIsDisabled} sx={sx.closeBtn}>
              <CrossIcon color='primary' />
            </IconButton>
          )}
        </Box>

        {!!description && <Typography variant='body1'>{description}</Typography>}

        {children}

        {showControlBlock && (
          <Box sx={sx.controlBtnGroup}>
            <Button
              sx={sx.controlBtn}
              onClick={onAccept}
              type={formId ? 'submit' : 'button'}
              disabled={acceptIsDisabled}
            >
              {acceptText || t('acceptText')}
            </Button>

            {showRefuseButton && (
              <Button sx={sx.controlBtn} variant='outlined' onClick={onClose}>
                {refuseText || t('refuseText')}
              </Button>
            )}
          </Box>
        )}
      </Box>
    </MUIModal>
  );
}
