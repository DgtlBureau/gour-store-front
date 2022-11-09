import React, { ReactNode } from 'react';

import { Modal as MUIModal } from '@mui/material';

import { useLocalTranslation } from 'hooks/useLocalTranslation';

import translations from './Modal.i18n.json';

import { Box } from '../Box/Box';
import { Button } from '../Button/Button';
import { IconButton } from '../IconButton/IconButton';
import { Typography } from '../Typography/Typography';
import modalSx from './Modal.styles';

import CrossIcon from '@mui/icons-material/Clear';

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
      <div>
        <Box sx={modalSx.modal}>
          <Box sx={modalSx.head}>
            {titleIsString ? (
              <Typography sx={modalSx.title} variant='h6' color='primary'>
                {title}
              </Typography>
            ) : (
              title
            )}

            {!!onClose && (
              <IconButton onClick={onClose} disabled={closeIsDisabled} sx={modalSx.closeBtn}>
                <CrossIcon color='primary' />
              </IconButton>
            )}
          </Box>

          <Box sx={modalSx.body}>
            {!!description && <Typography variant='body1'>{description}</Typography>}

            {children}
          </Box>

          {showControlBlock && (
            <Box sx={modalSx.controlBtnGroup}>
              <Button
                sx={modalSx.controlBtn}
                onClick={onAccept}
                type={formId ? 'submit' : 'button'}
                form={formId}
                disabled={acceptIsDisabled}
              >
                {acceptText || t('acceptText')}
              </Button>

              {showRefuseButton && (
                <Button sx={modalSx.controlBtn} variant='outlined' onClick={onClose}>
                  {refuseText || t('refuseText')}
                </Button>
              )}
            </Box>
          )}
        </Box>
      </div>
    </MUIModal>
  );
}
