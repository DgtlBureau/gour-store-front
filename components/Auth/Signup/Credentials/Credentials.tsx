import React, { useEffect, useState } from 'react';
import { FormControlLabel, Radio, CircularProgress } from '@mui/material';
import { useForm, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { HFCodeInput } from 'components/HookForm/HFCodeInput';
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

import sx from './Credentials.styles';

export type SignupCredentialsProps = {
  defaultValues?: SignUpFormDto;
  codeCheckIsLoading?: boolean;
  onBack(): void;
  onSendSMS(phone: string): Promise<'success' | string>;
  onCheckCode: (code: string) => Promise<boolean>;
  onSubmit(data: SignUpFormDto): void;
};

export function SignupCredentials({
  defaultValues,
  codeCheckIsLoading,
  onBack,
  onSendSMS,
  onCheckCode,
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

  const emailIsInvalid = !values.watch('email') || !!values.getFieldState('email').error;
  const codeIsValid = !values.watch('sms') || !!values.getFieldState('sms').error;
  const formIsInvalid = !values.formState.isValid || !isAgree;

  const sendSMS = async () => {
    if (isCodeSended) return;
    const target = values.watch('email');

    const response = await onSendSMS(target);
    if (response === 'success') {
      setIsCodeSended(true);
    } else {
      values.setError('email', { message: response });
    }
  };

  const checkCode = async () => {
    const code = values.watch('sms');
    const status = await onCheckCode(code);
    setIsCodeSuccess(status);
  };

  const agree = () => setIsAgree(!isAgree);

  const submit = (data: SignUpFormDto) => onSubmit(data);

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
            <HFTextField type='email' name='email' disabled={isCodeSended} label={t('email')} />
            <Button sx={sx.getCodeBtn} onClick={sendSMS} disabled={emailIsInvalid || isCodeSended}>
              {t('getCode')}
            </Button>
          </Box>
          {isCodeSended && !isCodeSuccess && (
            <Box sx={sx.field}>
              <HFCodeInput
                name='sms'
                onChange={value => {
                  if (value.length === 4) checkCode();
                }}
                // disabled={codeCheckIsLoading}
              />

              {codeCheckIsLoading && <CircularProgress size={40} sx={sx.progress} />}
            </Box>
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
          <Button type='submit' disabled={formIsInvalid} sx={sx.submitBtn}>
            {t('submit')}
          </Button>
        </form>
      </FormProvider>
    </AuthCard>
  );
}
