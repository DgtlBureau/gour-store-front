import React, { useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Stack } from '@mui/material';

import { useLocalTranslation } from 'hooks/useLocalTranslation';
import { PasswordRecoveryDto } from 'types/dto/password-recovery.dto';
import translations from './PassRecovery.i18n.json';
import { getSchema } from './validation';
import { AuthCard } from 'components/Auth/Card/Card';
import { Box } from 'components/UI/Box/Box';
import { Button } from 'components/UI/Button/Button';
import { Typography } from 'components/UI/Typography/Typography';
import { HFTextField } from 'components/HookForm/HFTextField';
import { HFPhoneInput } from 'components/HookForm/HFPhoneInput';
import { HFCodeInput } from 'components/HookForm/HFCodeInput';

import sx from './PassRecovery.styles';

export type SigninPassRecoveryProps = {
  defaultValues: PasswordRecoveryDto;
  onBack(): void;
  onCheckCode: (code: string) => Promise<boolean>;
  onSendSMS(phone: string): Promise<'success' | 'failed'>;
  onSubmit(data: PasswordRecoveryDto): void;
};

export function SigninPassRecovery({
  defaultValues,
  onBack,
  onCheckCode,
  onSendSMS,
  onSubmit,
}: SigninPassRecoveryProps) {
  const [isCodeSended, setIsCodeSended] = useState(false);
  const [isCodeSuccess, setIsCodeSuccess] = useState(false);

  const { t } = useLocalTranslation(translations);

  const schema = getSchema(t);

  const values = useForm<PasswordRecoveryDto>({
    defaultValues,
    mode: 'onBlur',
    resolver: yupResolver(schema),
  });

  const phoneIsInvalid = !values.watch('phone') || !!values.getFieldState('phone').error;
  const formIsInvalid = !values.formState.isValid || !isCodeSuccess;

  const sendSMS = async () => {
    if (isCodeSended) return;

    const phone = values.watch('phone');

    const response = await onSendSMS(phone);

    if (response === 'success') setIsCodeSended(true);
    else values.setError('phone', { message: '' });
  };

  const checkCode = async () => {
    const code = values.watch('sms');
    const status = await onCheckCode(code);

    setIsCodeSuccess(status);
  };

  const submit = (data: PasswordRecoveryDto) => onSubmit(data);

  return (
    <AuthCard>
      <FormProvider {...values}>
        <form onSubmit={values.handleSubmit(submit)}>
          <Button sx={sx.backBtn} size='small' variant='outlined' onClick={onBack}>
            {t('back')}
          </Button>

          <Typography sx={sx.title}>{t('title')}</Typography>

          <Box sx={{ ...sx.field, ...sx.phone }}>
            <HFPhoneInput name='phone' disabled={isCodeSended} label={t('phone')} />
            <Button sx={sx.getCodeBtn} onClick={sendSMS} disabled={phoneIsInvalid || isCodeSended}>
              {t('getCode')}
            </Button>
          </Box>

          {isCodeSended && (
            <Stack sx={sx.field}>
              <HFCodeInput
                name='sms'
                onChange={value => {
                  if (value.length === 4) {
                    checkCode();
                  }
                }}
              />
              {isCodeSuccess && <Typography variant='body1'>Код подтвержден</Typography>}
            </Stack>
          )}

          {isCodeSuccess && (
            <>
              <HFTextField
                sx={sx.field}
                type='password'
                name='password'
                label={t('password')}
                helperText={t('passwordHelper')}
              />
              <HFTextField sx={sx.field} type='password' name='passwordConfirm' label={t('passwordConfirm')} />
            </>
          )}

          <Button type='submit' disabled={formIsInvalid} sx={sx.submitBtn}>
            {t('submit')}
          </Button>
        </form>
      </FormProvider>
    </AuthCard>
  );
}
