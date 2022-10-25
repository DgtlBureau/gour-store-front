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
  acceptText?: string;
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
  formId,
  acceptIsDisabled,
  closeIsDisabled,
  onAccept,
  onClose,
}: ModalProps) {
  const { t } = useLocalTranslation(translations);

  const titleIsString = typeof title === 'string';

  return (
    <MUIModal open={isOpen} onClose={onClose}>
      <div>
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
      </div>
    </MUIModal>
  );
}
