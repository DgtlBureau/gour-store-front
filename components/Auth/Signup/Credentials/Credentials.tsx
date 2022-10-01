import React, { useEffect, useState } from 'react';
import { FormControlLabel, Radio, CircularProgress, Divider } from '@mui/material';
import { useForm, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import SendIcon from '@mui/icons-material/Send';

import { LinkRef as Link } from 'components/UI/Link/Link';
import { Path } from 'constants/routes';
import { useLocalTranslation } from 'hooks/useLocalTranslation';
import { SignUpFormDto } from 'types/dto/signup-form.dto';
import translations from './Credentials.i18n.json';
import { getSchema } from './validation';
import { AuthCard } from 'components/Auth/Card/Card';
import { Box } from 'components/UI/Box/Box';
import { Button } from 'components/UI/Button/Button';
import { Typography } from 'components/UI/Typography/Typography';
import { Checkbox } from 'components/UI/Checkbox/Checkbox';
import { HFTextField } from 'components/HookForm/HFTextField';
import { HFRadioGroup } from 'components/HookForm/HFRadioGroup';
import { IconButton } from 'components/UI/IconButton/IconButton';

import sx from './Credentials.styles';

export type SignupCredentialsProps = {
  defaultValues?: SignUpFormDto;
  codeIsSending?: boolean;
  onBack(): void;
  onEmailSend(email: string): Promise<boolean>;
  onCodeCheck: (code: string) => Promise<boolean>;
  onSubmit(data: SignUpFormDto): void;
};

export function SignupCredentials({
  defaultValues,
  codeIsSending,
  onBack,
  onEmailSend,
  onCodeCheck,
  onSubmit,
}: SignupCredentialsProps) {
  const [seconds, setSeconds] = useState(0);
  const [isCodeSended, setIsCodeSended] = useState(false);
  const [isCodeSuccess, setIsCodeSuccess] = useState(false);

  const [isAgree, setIsAgree] = useState(false);

  const { t } = useLocalTranslation(translations);

  const schema = getSchema(t);

  const values = useForm<SignUpFormDto>({
    defaultValues: {
      ...defaultValues,
      role: defaultValues?.role || 'CLIENT',
    },
    mode: 'onBlur',
    resolver: yupResolver(schema),
  });

  const timerIsOn = seconds > 0;
  const emailIsValid = !!values.watch('email') && !values.getFieldState('email').error;
  const formIsValid = values.formState.isValid && isCodeSuccess && isAgree;
  const sendingIsDisabled = timerIsOn || !emailIsValid || isCodeSuccess;

  useEffect(() => {
    if (seconds === 0) return;

    const intervalId = setInterval(() => {
      setSeconds(sec => sec - 1);
    }, 1000);

    // eslint-disable-next-line consistent-return
    return () => clearInterval(intervalId);
  }, [seconds]);

  const sendEmail = async () => {
    const email = values.watch('email');

    const isSended = await onEmailSend(email);

    setIsCodeSended(isSended);

    if (isSended) setSeconds(30);
    else values.setError('email', { message: '' });
  };

  const checkCode = async () => {
    const code = values.watch('code');
    const status = await onCodeCheck(code);

    setIsCodeSuccess(status);
  };

  const changeCode = (value: string) => {
    if (value.length === 4) checkCode();
  };

  const agree = () => setIsAgree(!isAgree);

  const submit = (data: SignUpFormDto) => {
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

          <HFRadioGroup name='role' sx={sx.radioGroup}>
            <FormControlLabel sx={sx.radioBtn} value='CLIENT' control={<Radio />} label={t('physical')} />
            <FormControlLabel sx={sx.radioBtn} value='COMPANY' control={<Radio />} label={t('company')} />
            <FormControlLabel
              sx={sx.radioBtn}
              value='COLLECTIVE_PURCHASE'
              control={<Radio />}
              label={t('collectivePurchase')}
            />
          </HFRadioGroup>

          <Box sx={{ ...sx.field, ...sx.phone }}>
            <HFTextField
              type='email'
              name='email'
              disabled={isCodeSuccess}
              label={t('email')}
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
                label={t('code')}
                name='code'
                onChange={event => changeCode(event.target.value)}
              />

              {timerIsOn && (
                <Box sx={sx.timer}>
                  <Typography variant='body2'>{t('codeHelper')}</Typography>
                  <Typography variant='body2'>
                    {seconds} {t('sec')}
                  </Typography>
                </Box>
              )}
            </>
          )}

          {isCodeSuccess && (
            <>
              <HFTextField sx={sx.field} type='text' name='firstName' label={t('firstName')} />
              <HFTextField sx={sx.field} type='text' name='lastName' label={t('lastName')} />
              <HFTextField
                sx={sx.field}
                type='password'
                name='password'
                label={t('password')}
                helperText={t('passwordHelper')}
              />
              <HFTextField sx={sx.field} type='password' name='passwordConfirm' label={t('passwordConfirm')} />
              <Checkbox
                sx={sx.field}
                value={isAgree}
                onChange={agree}
                label={
                  <Typography variant='body2' sx={sx.checkboxLabel}>
                    Я даю свое согласие на сбор и обработку моих персональных данных в соответствии с{' '}
                    <Link href={`/${Path.RULES}`} target='_blank'>
                      Политикой
                    </Link>{' '}
                    и принимаю условия{' '}
                    <Link href={`/${Path.OFERTA}`} target='_blank'>
                      Пользовательского соглашения
                    </Link>
                  </Typography>
                }
              />
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
