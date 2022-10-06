import React, { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import { yupResolver } from '@hookform/resolvers/yup';

import { AuthCard } from 'components/Auth/Card/Card';
import { HFPassField } from 'components/HookForm/HFPassField';
import { HFSendField } from 'components/HookForm/HFSendField';
import { HFTextField } from 'components/HookForm/HFTextField';
import { Box } from 'components/UI/Box/Box';
import { Button } from 'components/UI/Button/Button';
import { Typography } from 'components/UI/Typography/Typography';

import { PasswordRecoveryDto } from 'types/dto/password-recovery.dto';

import { useLocalTranslation } from 'hooks/useLocalTranslation';

import translations from './PassRecovery.i18n.json';
import sx from './PassRecovery.styles';
import { getSchema } from './validation';

export type SigninPassRecoveryProps = {
  defaultValues?: PasswordRecoveryDto;
  codeIsSending?: boolean;
  onBack(): void;
  onEmailSend(email: string): Promise<void>;
  onCodeCheck(code: string): Promise<void>;
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
  const [seconds, setSeconds] = useState<number | null>(null);
  const [isCodeSended, setIsCodeSended] = useState(false);
  const [isCodeSuccess, setIsCodeSuccess] = useState(false);

  const { t } = useLocalTranslation(translations);

  const schema = getSchema(t);

  const values = useForm<PasswordRecoveryDto>({
    defaultValues,
    mode: 'onBlur',
    resolver: yupResolver(schema),
  });

  const emailIsValid = !!values.watch('email') && !values.getFieldState('email').error;
  const formIsValid = values.formState.isValid && isCodeSuccess;
  const sendingIsDisabled = !!seconds || !emailIsValid;

  const intervalRef = React.useRef<NodeJS.Timeout | null>(null);

  const clearTimer = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
  };

  useEffect(() => clearTimer, []);

  useEffect(() => {
    if (seconds && !intervalRef.current) {
      intervalRef.current = setInterval(() => {
        setSeconds(sec => sec && sec - 1);
      }, 1000);
    }
    if (seconds === 0) {
      setSeconds(null);
      clearTimer();
    }
  }, [seconds]);

  const sendEmail = async () => {
    const email = values.getValues('email');

    try {
      await onEmailSend(email);

      setIsCodeSended(true);
      setSeconds(30);
    } catch (e) {
      setIsCodeSended(false);
      values.setError('email', { message: String(e) });
    }
  };

  const checkCode = async (value: string) => {
    if (value.length !== 4) return;

    try {
      await onCodeCheck(value);

      setIsCodeSuccess(true);
    } catch (e) {
      setIsCodeSuccess(false);
      values.setError('code', { message: String(e) });
    }
  };

  const resetEmailStates = () => {
    setSeconds(null);
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
              onChange={changeEmail}
              isSending={!!codeIsSending}
              sendingIsDisabled={sendingIsDisabled}
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
