/* eslint-disable jsx-a11y/anchor-is-valid */
// FIXME: убрать ошибки eslint'a
import React, { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import { yupResolver } from '@hookform/resolvers/yup';
import { Link } from '@mui/material';

import { AuthCard } from 'components/Auth/Card/Card';
import { HFPassField } from 'components/HookForm/HFPassField/HFPassField';
import { HFTextField } from 'components/HookForm/HFTextField';
import { Box } from 'components/UI/Box/Box';
import { Button } from 'components/UI/Button/Button';
import { Typography } from 'components/UI/Typography/Typography';

import { SignInDto } from 'types/dto/signin.dto';

import { useLocalTranslation } from 'hooks/useLocalTranslation';

import translations from './Credentials.i18n.json';
import { getSchema } from './validation';

import sx from './Credentials.styles';

export type SigninCredentialsProps = {
  defaultValues?: SignInDto;
  onBack(): void;
  onPasswordChange(): void;
  onRegister(): void;
  onSubmit(data: SignInDto): void;
};

export function SigninCredentials({
  defaultValues,
  onBack,
  onPasswordChange,
  onRegister,
  onSubmit,
}: SigninCredentialsProps) {
  const { t } = useLocalTranslation(translations);

  const schema = getSchema(t);

  const values = useForm<SignInDto>({
    defaultValues,
    mode: 'onBlur',
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    values.reset(defaultValues);
  }, [defaultValues]);

  const submit = (data: SignInDto) => onSubmit(data);

  return (
    <AuthCard>
      <FormProvider {...values}>
        <form onSubmit={values.handleSubmit(submit)}>
          <Button sx={sx.backBtn} size='small' variant='outlined' onClick={onBack}>
            {t('back')}
          </Button>

          <Typography sx={sx.title}>{t('title')}</Typography>

          <HFTextField sx={sx.field} name='email' type='email' label={t('email')} />

          <HFPassField sx={sx.field} name='password' label={t('password')} />

          <Box sx={sx.links}>
            <Link sx={sx.link} component='button' type='button' variant='body2' onClick={onPasswordChange}>
              {t('forgotPassword')}
            </Link>

            <Link sx={sx.link} component='button' type='button' variant='body2' onClick={onRegister}>
              {t('noAccount')}
            </Link>
          </Box>

          <Button type='submit' sx={sx.submitBtn}>
            {t('submit')}
          </Button>
        </form>
      </FormProvider>
    </AuthCard>
  );
}
