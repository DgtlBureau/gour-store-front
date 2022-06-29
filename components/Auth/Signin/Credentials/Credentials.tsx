import React from 'react';
import { Link } from '@mui/material';
import { useForm, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import translations from './Credentials.i18n.json';
import { useLocalTranslation } from '../../../../hooks/useLocalTranslation';
import { getSchema } from './validation';
import { AuthCard } from '../../Card/Card';
import { Box } from '../../../UI/Box/Box';
import { Button } from '../../../UI/Button/Button';
import { Typography } from '../../../UI/Typography/Typography';
import { HFTextField } from '../../../HookForm/HFTextField';
import { SignInDto } from '../../../../@types/dto/signin.dto';
import { Translator } from 'utils/Translator';

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

  const formIsInvalid = !values.formState.isValid;

  const submit = (data: SignInDto) => onSubmit(data);

  return (
    <AuthCard>
      <FormProvider {...values}>
        <form onSubmit={values.handleSubmit(submit)}>
          <Button
            sx={sx.backBtn}
            size="small"
            variant="outlined"
            onClick={onBack}
          >
            {t('back')}
          </Button>

          <Typography sx={sx.title}>{t('title')}</Typography>

          <HFTextField sx={sx.field} name="phone" label={t('phone')} />

          <HFTextField
            sx={sx.field}
            type="password"
            name="password"
            label={t('password')}
          />

          <Box sx={sx.links}>
            <Link component="button" variant="body2" onClick={onPasswordChange}>
              {t('forgotPassword')}
            </Link>

            <Link component="button" variant="body2" onClick={onRegister}>
              {t('noAccount')}
            </Link>
          </Box>

          <Button type="submit" disabled={formIsInvalid} sx={sx.submitBtn}>
            {t('submit')}
          </Button>
        </form>
      </FormProvider>
    </AuthCard>
  );
}
