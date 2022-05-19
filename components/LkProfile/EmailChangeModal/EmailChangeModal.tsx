import React, { useEffect } from 'react';
import s from './EmailChangeModal.module.scss';
import translations from './EmailChangeModal.i18n.json';
import { useLocalTranslation } from '../../../hooks/useLocalTranslation';
import { Modal, Stack } from '@mui/material';
import { IconButton } from '../../UI/IconButton/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { FormProvider, useForm } from 'react-hook-form';
import { Typography } from '../../UI/Typography/Typography';
import { getValidationSchema } from './validation';
import { yupResolver } from '@hookform/resolvers/yup';
import { HFTextField } from '../../HookForm/HFTextField';
import { Button } from '../../UI/Button/Button';

export type EmailChangeModalProps = {
  isOpened: boolean;
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

export function EmailChangeModal({
  isOpened,
  onClose,
  onChange,
}: EmailChangeModalProps) {
  const { t } = useLocalTranslation(translations);

  const schema = getValidationSchema(t);

  const values = useForm<{ email: string }>({
    mode: 'onBlur',
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    values.reset();
  }, [isOpened]);

  const submitHandler = (formData: { email: string }) => {
    onChange(formData.email);
  };

  return (
    <Modal open={isOpened} onClose={onClose}>
      <Stack sx={sx.container} spacing={2}>
        <IconButton sx={sx.closeBtn} onClick={onClose}>
          <CloseIcon />
        </IconButton>
        <Typography variant="h6">{t('title')}</Typography>
        <Typography variant="body1">{t('subTitle')}</Typography>
        <FormProvider {...values}>
          <form onSubmit={values.handleSubmit(submitHandler)}>
            <Stack spacing={2}>
              <HFTextField
                type="email"
                name="email"
                label={t('passwordConfirm')}
              />
              <Button type="submit" sx={sx.submitBtn}>
                {t('send')}
              </Button>
            </Stack>
          </form>
        </FormProvider>
      </Stack>
    </Modal>
  );
}
