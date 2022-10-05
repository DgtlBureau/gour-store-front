import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import { yupResolver } from '@hookform/resolvers/yup';
import { Stack } from '@mui/material';

import { HFPassField } from 'components/HookForm/HFPassField';
import { Box } from 'components/UI/Box/Box';
import { Modal } from 'components/UI/Modal/Modal';
import { Typography } from 'components/UI/Typography/Typography';

import { useLocalTranslation } from 'hooks/useLocalTranslation';

import translations from './PasswordChangeModal.i18n.json';
import { getSchema } from './validation';

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

  const schema = getSchema(t);

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
      formId='passwordChangeForm'
      acceptIsDisabled={formIsInvalid}
    >
      <Box sx={sx.body}>
        <FormProvider {...values}>
          <form id='passwordChangeForm' onSubmit={values.handleSubmit(submit)}>
            <Stack spacing={2}>
              <HFPassField name='prevPassword' label={t('currentPassword')} />
              <HFPassField name='newPassword' label={t('newPassword')} />
              <HFPassField name='repeatNewPassword' label={t('passwordConfirm')} />
            </Stack>
          </form>
        </FormProvider>

        {!!error && (
          <Typography sx={sx.error} variant='body2' color='error'>
            {error}
          </Typography>
        )}
      </Box>
    </Modal>
  );
}
