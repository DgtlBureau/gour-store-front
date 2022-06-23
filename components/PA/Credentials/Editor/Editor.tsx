import React, { useEffect } from 'react';
import { Stack } from '@mui/material';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import SettingsIcon from '@mui/icons-material/Settings';

import translations from './Editor.i18n.json';
import { useLocalTranslation } from '../../../../hooks/useLocalTranslation';
import { HFTextField } from '../../../HookForm/HFTextField';
import { TextField } from '../../../UI/TextField/TextField';
import { IconButton } from '../../../UI/IconButton/IconButton';
import { Button } from '../../../UI/Button/Button';
import { getValidationSchema } from './validation';
import { UpdateUserDto } from '../../../../@types/dto/profile/update-user.dto';

type UserData = {
  firstName: string;
  lastName: string;
  email: string;
  referralCode: string;
};

export type PACredentialsEditorProps = {
  user: UserData;
  phone: string;
  onChangePhone(): void;
  onChangePassword(): void;
  onSave(updatedUser: UpdateUserDto): void;
};

export function PACredentialsEditor({
  user,
  phone,
  onSave,
  onChangePhone,
  onChangePassword,
}: PACredentialsEditorProps) {
  const { t } = useLocalTranslation(translations);

  const schema = getValidationSchema(t);

  const values = useForm<UserData>({
    defaultValues: user,
    mode: 'onBlur',
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    values.reset(user);
  }, [user]);

  const submitHandler = (formData: Partial<UserData>) => {
    onSave(formData);
  };
  const cancelHandler = () => {
    values.reset(user);
  };

  return (
    <FormProvider {...values}>
      <form onSubmit={values.handleSubmit(submitHandler)}>
        <Stack spacing={2} sx={{ margin: '0 0 10px 0' }}>
          <HFTextField name="firstName" label={t('firstName')} />
          <HFTextField name="lastName" label={t('lastName')} />
          <HFTextField name="email" label={t('email')} />
          <TextField
            value={phone}
            label={t('phone')}
            endAdornment={
              <IconButton onClick={onChangePhone}>
                <SettingsIcon />
              </IconButton>
            }
          />
          <TextField
            type="password"
            value="1234567890"
            label={t('password')}
            endAdornment={
              <IconButton onClick={onChangePassword}>
                <SettingsIcon />
              </IconButton>
            }
          />
          <HFTextField name="referralCode" label={t('referralCode')} />
        </Stack>
        <Button
          type="submit"
          disabled={!values.formState.isDirty}
          sx={{ margin: '0 10px 0 0' }}
        >
          {t('submit')}
        </Button>
        <Button disabled={!values.formState.isDirty} onClick={cancelHandler}>
          {t('cancel')}
        </Button>
      </form>
    </FormProvider>
  );
}
