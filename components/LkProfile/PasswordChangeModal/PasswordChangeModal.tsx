import React, { useEffect } from 'react';
import s from './PasswordChangeModal.module.scss';
import translations from './PasswordChangeModal.i18n.json';
import { useLocalTranslation } from '../../../hooks/useLocalTranslation';
import { Box, Modal, Stack } from '@mui/material';
import { Typography } from '../../UI/Typography/Typography';
import { HFTextField } from '../../HookForm/HFTextField';
import { FormProvider, useForm } from 'react-hook-form';
import { string } from 'yup';
import { Button } from '../../UI/Button/Button';
import { getSchema, Translator } from './validation';
import { yupResolver } from '@hookform/resolvers/yup';
import { IconButton } from '../../UI/IconButton/IconButton';
import CloseIcon from '@mui/icons-material/Close';

export type PasswordChangeModalProps = {
  isOpened: boolean;
  onClose(): void;
  onChange(changePasswordDto: {
    prevPassword: string;
    newPassword: string;
  }): void;
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
};

type FormType = {
  prevPassword: string;
  newPassword: string;
  repeatNewPassword: string;
};

export function PasswordChangeModal({
  isOpened,
  onClose,
  onChange,
}: PasswordChangeModalProps) {
  const { t } = useLocalTranslation(translations);

  const schema = getSchema(t as Translator);

  const values = useForm<FormType>({
    mode: 'onBlur',
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    values.reset();
  }, [isOpened]);

  const submitHandler = (formData: FormType) => {
    const { prevPassword, newPassword, repeatNewPassword } = formData;
    onChange({ prevPassword, newPassword });
  };

  return (
    <Modal open={isOpened} onClose={onClose}>
      <Box sx={sx.container}>
        <IconButton sx={sx.closeBtn} onClick={onClose}>
          <CloseIcon />
        </IconButton>
        <Typography variant="h6">{t('title')}</Typography>
        <Typography variant="body1">{t('subTitle')}</Typography>
        <FormProvider {...values}>
          <form onSubmit={values.handleSubmit(submitHandler)}>
            <Stack spacing={2}>
              <HFTextField
                type="password"
                name="prevPassword"
                label={t('currentPassword')}
              />
              <HFTextField
                type="password"
                name="newPassword"
                label={t('newPassword')}
              />
              <HFTextField
                type="password"
                name="repeatNewPassword"
                label={t('passwordConfirm')}
              />
              <Button sx={{ width: '100%' }} type="submit">
                {t('confirm')}
              </Button>
            </Stack>
          </form>
        </FormProvider>
      </Box>
    </Modal>
  );
}
