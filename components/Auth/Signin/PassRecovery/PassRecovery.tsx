import React, { useEffect, useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { CircularProgress, Divider } from '@mui/material';

import SendIcon from '@mui/icons-material/Send';

import { useLocalTranslation } from 'hooks/useLocalTranslation';
import { PasswordRecoveryDto } from 'types/dto/password-recovery.dto';
import translations from './PassRecovery.i18n.json';
import { getSchema } from './validation';
import { AuthCard } from 'components/Auth/Card/Card';
import { Box } from 'components/UI/Box/Box';
import { Button } from 'components/UI/Button/Button';
import { Typography } from 'components/UI/Typography/Typography';
import { HFTextField } from 'components/HookForm/HFTextField';
import { IconButton } from 'components/UI/IconButton/IconButton';

import sx from './PassRecovery.styles';

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
  const sendingIsDisabled = !!seconds || !emailIsValid || isCodeSuccess;

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

  const submit = (data: PasswordRecoveryDto) => {
    onSubmit(data);
    setSeconds(0);
    setIsCodeSended(false);
    setIsCodeSuccess(false);
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
            <HFTextField
              type='email'
              name='email'
              label={t('email')}
              disabled={isCodeSuccess}
              endAdornment={
                <>
                  <Divider sx={sx.divider} orientation='vertical' />

                  {codeIsSending ? (
                    <CircularProgress />
                  ) : (
                    <IconButton disabled={sendingIsDisabled} onClick={sendEmail}>
                      <SendIcon />
                    </IconButton>
                  )}
                </>
              }
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

          <Button type='submit' disabled={!formIsValid} sx={sx.submitBtn}>
            {t('submit')}
          </Button>
        </form>
      </FormProvider>
    </AuthCard>
  );
}
