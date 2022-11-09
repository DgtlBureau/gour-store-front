import React, { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import { yupResolver } from '@hookform/resolvers/yup';

import { AuthCard } from 'components/Auth/Card/Card';
import { HFPassField } from 'components/HookForm/HFPassField/HFPassField';
import { HFSendField } from 'components/HookForm/HFSendField/HFSendField';
import { HFTextField } from 'components/HookForm/HFTextField';
import { Box } from 'components/UI/Box/Box';
import { Button } from 'components/UI/Button/Button';
import { Typography } from 'components/UI/Typography/Typography';

import { PasswordRecoveryDto } from 'types/dto/password-recovery.dto';

import { useLocalTranslation } from 'hooks/useLocalTranslation';
import { useStopwatch } from 'hooks/useStopwatch';

import translations from './PassRecovery.i18n.json';

import sx from './PassRecovery.styles';
import { getSchema } from './validation';

export type SigninPassRecoveryProps = {
  defaultValues?: PasswordRecoveryDto;
  codeIsSending?: boolean;
  onBack(): void;
  onEmailSend(email: string): Promise<void>;
  onCodeCheck(code: string): Promise<boolean>;
  onSubmit(data: PasswordRecoveryDto): void;
};

export function SigninPassRecovery({
  defaultValues,
  codeIsSending,
  onBack,
  onEmailSend,
  onCodeCheck,
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

  const { seconds, startCount, stopCount } = useStopwatch(30);

  const emailIsValid = !!values.watch('email') && !values.getFieldState('email').error;
  const formIsValid = values.formState.isValid && isCodeSuccess;
  const sendingIsDisabled = !!seconds || !emailIsValid || isCodeSuccess;

  const sendEmail = async () => {
    const email = values.getValues('email');

    try {
      await onEmailSend(email);

      setIsCodeSended(true);

      startCount();
    } catch (e) {
      setIsCodeSended(false);
      values.setError('email', { message: String(e) });
    }
  };

  const checkCode = async (value: string) => {
    if (value.length !== 4) return;

    try {
      const isSuccess = await onCodeCheck(value);

      setIsCodeSuccess(isSuccess);

      if (!isSuccess) values.setError('code', { message: 'Неверный код' });
    } catch (e) {
      setIsCodeSuccess(false);
      values.setError('code', { message: String(e) });
    }
  };

  const resetEmailStates = () => {
    stopCount();
    setIsCodeSended(false);
    setIsCodeSuccess(false);
    values.resetField('code');
  };

  const changeEmail = () => {
    if (isCodeSended) resetEmailStates();
  };

  const submit = (data: PasswordRecoveryDto) => {
    onSubmit(data);
    resetEmailStates();
  };

  return (
    <AuthCard>
      <FormProvider {...values}>
        <form onSubmit={values.handleSubmit(submit)}>
          <Button sx={sx.backBtn} size='small' variant='outlined' onClick={onBack}>
            {t('back')}
          </Button>

          <Typography sx={sx.title}>{t('title')}</Typography>

          <Box sx={{ ...sx.field, ...sx.phone }}>
            <HFSendField
              label={t('email')}
              name='email'
              isSending={!!codeIsSending}
              disabled={isCodeSuccess}
              sendingIsDisabled={sendingIsDisabled}
              onChange={changeEmail}
              onSend={sendEmail}
            />
          </Box>

          {isCodeSended && !isCodeSuccess && (
            <>
              <HFTextField
                sx={{ ...sx.field, ...sx.codeField }}
                name='code'
                label={t('code')}
                onChange={e => checkCode(e.target.value)}
              />

              {!!seconds && (
                <Box sx={sx.timer}>
                  <Typography variant='body2'>{t('codeHelper')}</Typography>
                  <Typography variant='body2'>
                    {seconds} {t('sec')}
                  </Typography>
                </Box>
              )}
            </>
          )}

          {isCodeSended && isCodeSuccess && (
            <>
              <HFPassField sx={sx.field} name='password' label={t('password')} helperText={t('passwordHelper')} />
              <HFPassField sx={sx.field} name='passwordConfirm' label={t('passwordConfirm')} />
            </>
          )}

          <Button type='submit' disabled={!formIsValid} sx={sx.submitBtn}>
            {t('submit')}
          </Button>
        </form>
      </FormProvider>
    </AuthCard>
  );
}
