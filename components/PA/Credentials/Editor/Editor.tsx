import React, { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import { yupResolver } from '@hookform/resolvers/yup';
import { Divider, Stack } from '@mui/material';

import { HFPhoneInput } from 'components/HookForm/HFPhoneInput';
import { HFTextField } from 'components/HookForm/HFTextField';
import { Button } from 'components/UI/Button/Button';
import { IconButton } from 'components/UI/IconButton/IconButton';

import { UpdateUserDto } from 'types/dto/profile/update-user.dto';

import { useLocalTranslation } from 'hooks/useLocalTranslation';

import translations from './Editor.i18n.json';

import { getValidationSchema } from './validation';

import SettingsIcon from '@mui/icons-material/Settings';

const sx = {
  divider: {
    height: 28,
    marginRight: '14px',
  },
};

export type CredentialsFormType = {
  firstName: string;
  lastName: string;
  phone?: string;
  email: string;
  referralCode?: string;
  password?: string;
};

export type PACredentialsEditorProps = {
  defaultValues: CredentialsFormType;
  onChangeEmail(): void;
  onChangePassword(): void;
  onSubmit(updatedUser: UpdateUserDto): void;
};

export function PACredentialsEditor({
  defaultValues,
  onSubmit,
  onChangeEmail,
  onChangePassword,
}: PACredentialsEditorProps) {
  const { t } = useLocalTranslation(translations);

  const schema = getValidationSchema(t);

  const values = useForm<CredentialsFormType>({
    defaultValues,
    mode: 'onBlur',
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    values.reset(defaultValues);
  }, [defaultValues]);

  const submit = ({ firstName, lastName, phone, referralCode }: CredentialsFormType) =>
    onSubmit({ firstName, lastName, phone, referralCode });

  const cancel = () => values.reset(defaultValues);

  return (
    <FormProvider {...values}>
      <form onSubmit={values.handleSubmit(submit)}>
        <Stack spacing={2} sx={{ margin: '0 0 10px 0' }}>
          <HFTextField name='firstName' label={t('firstName')} />
          <HFTextField name='lastName' label={t('lastName')} />
          <HFPhoneInput name='phone' label={t('phone')} />
          <HFTextField
            name='email'
            label={t('email')}
            disabled
            endAdornment={
              <>
                <Divider sx={sx.divider} orientation='vertical' />
                <IconButton onClick={onChangeEmail}>
                  <SettingsIcon />
                </IconButton>
              </>
            }
          />
          <HFTextField
            type='password'
            name='password'
            label={t('password')}
            disabled
            endAdornment={
              <>
                <Divider sx={sx.divider} orientation='vertical' />
                <IconButton onClick={onChangePassword}>
                  <SettingsIcon />
                </IconButton>
              </>
            }
          />
          <HFTextField name='referralCode' label={t('referralCode')} />
        </Stack>

        <Button type='submit' disabled={!values.formState.isDirty} sx={{ margin: '0 10px 0 0' }}>
          {t('submit')}
        </Button>
        <Button disabled={!values.formState.isDirty} onClick={cancel}>
          {t('cancel')}
        </Button>
      </form>
    </FormProvider>
  );
}
