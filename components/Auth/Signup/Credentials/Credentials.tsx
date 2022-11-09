import React, { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import { yupResolver } from '@hookform/resolvers/yup';
import { FormControlLabel, Radio } from '@mui/material';

import { AuthCard } from 'components/Auth/Card/Card';
import { HFPassField } from 'components/HookForm/HFPassField/HFPassField';
import { HFRadioGroup } from 'components/HookForm/HFRadioGroup';
import { HFSendField } from 'components/HookForm/HFSendField/HFSendField';
import { HFTextField } from 'components/HookForm/HFTextField';
import { Box } from 'components/UI/Box/Box';
import { Button } from 'components/UI/Button/Button';
import { Checkbox } from 'components/UI/Checkbox/Checkbox';
import { LinkRef } from 'components/UI/Link/Link';
import { Typography } from 'components/UI/Typography/Typography';

import { SignUpFormDto } from 'types/dto/signup-form.dto';

import { Path } from 'constants/routes';
import { useLocalTranslation } from 'hooks/useLocalTranslation';
import { useStopwatch } from 'hooks/useStopwatch';

import translations from './Credentials.i18n.json';
import { getSchema } from './validation';

import sx from './Credentials.styles';

export type SignupCredentialsProps = {
  defaultValues?: SignUpFormDto;
  codeIsSending?: boolean;
  onBack(): void;
  onEmailSend(email: string): Promise<void>;
  onCodeCheck(code: string): Promise<boolean>;
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

  const { seconds, startCount, stopCount } = useStopwatch(30);

  const emailIsValid = !!values.watch('email') && !values.getFieldState('email').error;
  const formIsValid = values.formState.isValid && isAgree && isCodeSuccess;
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

  const agree = () => setIsAgree(!isAgree);

  const resetEmailStates = () => {
    stopCount();
    setIsCodeSended(false);
    setIsCodeSuccess(false);
    values.resetField('code');
  };

  const changeEmail = () => {
    if (isCodeSended) resetEmailStates();
  };

  const submit = (data: SignUpFormDto) => {
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
            <HFSendField
              label={t('email')}
              name='email'
              isSending={!!codeIsSending}
              sendingIsDisabled={sendingIsDisabled}
              disabled={isCodeSuccess}
              onChange={changeEmail}
              onSend={sendEmail}
            />
          </Box>

          {isCodeSended && !isCodeSuccess && (
            <>
              <HFTextField
                sx={{ ...sx.field, ...sx.codeField }}
                label={t('code')}
                name='code'
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

          {isCodeSuccess && (
            <>
              <HFTextField sx={sx.field} type='text' name='firstName' label={t('firstName')} />
              <HFTextField sx={sx.field} type='text' name='lastName' label={t('lastName')} />
              <HFPassField sx={sx.field} name='password' label={t('password')} helperText={t('passwordHelper')} />
              <HFPassField sx={sx.field} name='passwordConfirm' label={t('passwordConfirm')} />
              <Checkbox
                sx={sx.field}
                value={isAgree}
                onChange={agree}
                label={
                  <Typography variant='body2' sx={sx.checkboxLabel}>
                    Я даю свое согласие на сбор и обработку моих персональных данных в соответствии с{' '}
                    <LinkRef href={`/${Path.RULES}`} target='_blank'>
                      Политикой
                    </LinkRef>{' '}
                    и принимаю условия{' '}
                    <LinkRef href={`/${Path.OFERTA}`} target='_blank'>
                      Пользовательского соглашения
                    </LinkRef>
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
