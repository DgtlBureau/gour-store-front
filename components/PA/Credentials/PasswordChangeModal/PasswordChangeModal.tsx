import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { Stack } from '@mui/material';
import { yupResolver } from '@hookform/resolvers/yup';

import translations from './PasswordChangeModal.i18n.json';
import { getSchema, Translator } from './validation';
import { useLocalTranslation } from '../../../../hooks/useLocalTranslation';
import { Modal } from '../../../UI/Modal/Modal';
import { Box } from '../../../UI/Box/Box';
import { Typography } from '../../../UI/Typography/Typography';
import { Button } from '../../../UI/Button/Button';
import { HFTextField } from '../../../HookForm/HFTextField';

const sx = {
  body: {
    marginTop: '14px',
  },
  error: {
    marginTop: '8px',
  },
};

type FormType = {
  prevPassword: string;
  newPassword: string;
  repeatNewPassword: string;
};

export type PAPasswordChangeModalProps = {
  isOpen: boolean;
  error?: string;
  onClose(): void;
  onChange(data: FormType): void;
};

export function PAPasswordChangeModal({ isOpen, error, onClose, onChange }: PAPasswordChangeModalProps) {
  const { t } = useLocalTranslation(translations);

  const schema = getSchema(t as Translator);

  const values = useForm<FormType>({
    mode: 'onBlur',
    resolver: yupResolver(schema),
  });

  const formIsInvalid = !values.formState.isValid;

  const submit = (data: FormType) => onChange(data);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={t('title')}
      description={t('subTitle')}
      formId="passwordChangeForm"
      acceptIsDisabled={formIsInvalid}
      body={
        <Box sx={sx.body}>
          <FormProvider {...values}>
            <form id="passwordChangeForm" onSubmit={values.handleSubmit(submit)}>
              <Stack spacing={2}>
                <HFTextField type="password" name="prevPassword" label={t('currentPassword')} />
                <HFTextField type="password" name="newPassword" label={t('newPassword')} />
                <HFTextField type="password" name="repeatNewPassword" label={t('passwordConfirm')} />
              </Stack>
            </form>
          </FormProvider>

          {!!error && (
            <Typography sx={sx.error} variant="body2" color="error">
              {error}
            </Typography>
          )}
        </Box>
      }
    />
  );
}
