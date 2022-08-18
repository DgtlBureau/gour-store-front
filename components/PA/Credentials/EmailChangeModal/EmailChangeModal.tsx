import React, { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Modal, Stack } from '@mui/material';

import CloseIcon from '@mui/icons-material/Close';

import translations from './EmailChangeModal.i18n.json';
import { useLocalTranslation } from 'hooks/useLocalTranslation';
import { IconButton } from 'components/UI/IconButton/IconButton';
import { Typography } from 'components/UI/Typography/Typography';
import { getValidationSchema } from './validation';
import { HFTextField } from 'components/HookForm/HFTextField';
import { Button } from 'components/UI/Button/Button';

export type PAEmailChangeModalProps = {
  isOpen: boolean;
  onClose(): void;
  onChange(email: string): void;
};

const sx = {
  container: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    bgcolor: 'background.paper',
    padding: 4,
  },
  closeBtn: {
    position: 'absolute',
    top: '15px',
    right: '15px',
  },
  submitBtn: {
    with: '100%',
  },
};

export function PAEmailChangeModal({ isOpen, onClose, onChange }: PAEmailChangeModalProps) {
  const { t } = useLocalTranslation(translations);

  const schema = getValidationSchema(t);

  const values = useForm<{ email: string }>({
    mode: 'onBlur',
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    values.reset();
  }, [isOpen]);

  const submitHandler = (formData: { email: string }) => {
    onChange(formData.email);
  };

  return (
    <Modal open={isOpen} onClose={onClose}>
      <Stack sx={sx.container} spacing={2}>
        <IconButton sx={sx.closeBtn} onClick={onClose}>
          <CloseIcon />
        </IconButton>

        <Typography variant='h6'>{t('title')}</Typography>

        <Typography variant='body1'>{t('subTitle')}</Typography>

        <FormProvider {...values}>
          <form onSubmit={values.handleSubmit(submitHandler)}>
            <Stack spacing={2}>
              <HFTextField type='email' name='email' label={t('passwordConfirm')} />
              <Button type='submit' sx={sx.submitBtn}>
                {t('send')}
              </Button>
            </Stack>
          </form>
        </FormProvider>
      </Stack>
    </Modal>
  );
}
