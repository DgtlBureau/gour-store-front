import React, { useState } from 'react';
import { FormControlLabel, Grid, Radio, Stack } from '@mui/material';
import { useForm, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import translations from './Credentials.i18n.json';
import { useLocalTranslation } from '../../../../hooks/useLocalTranslation';
import { getSchema } from './validation';
import { SignUpFormDto } from '../../../../@types/dto/signup-form.dto';
import { AuthCard } from '../../Card/Card';
import { Box } from '../../../UI/Box/Box';
import { Button } from '../../../UI/Button/Button';
import { Typography } from '../../../UI/Typography/Typography';
import { Checkbox } from '../../../UI/Checkbox/Checkbox';
import { HFTextField } from '../../../HookForm/HFTextField';
import { HFRadioGroup } from '../../../HookForm/HFRadioGroup';
import { HFPhoneInput } from '../../../HookForm/HFPhoneInput';

import sx from './Credentials.styles';

export type SignupCredentialsProps = {
  defaultValues?: SignUpFormDto;
  onBack(): void;
  onSendSMS(phone: string): Promise<'success' | string>;
  onCheckCode: (code: string) => Promise<boolean>;
  onSubmit(data: SignUpFormDto): void;
};

export function SignupCredentials({
  defaultValues,
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

  const phoneIsInvalid =
    !values.watch('phone') || !!values.getFieldState('phone').error;
  const codeIsValid =
    !values.watch('sms') || !!values.getFieldState('sms').error;
  const formIsInvalid = !values.formState.isValid || !isAgree;

  const sendSMS = async () => {
    if (isCodeSended) return;
    const phone = values.watch('phone');

    const response = await onSendSMS(phone);
    if (response === 'success') {
      setIsCodeSended(true);
    } else {
      values.setError('phone', { message: response });
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
          <Button
            sx={sx.backBtn}
            size="small"
            variant="outlined"
            onClick={onBack}
          >
            {t('back')}
          </Button>

          <Typography sx={sx.title}>{t('title')}</Typography>

          <HFRadioGroup name="role" sx={sx.radioGroup}>
            <FormControlLabel
              sx={sx.radioBtn}
              value="CLIENT"
              control={<Radio />}
              label={t('physical')}
            />
            <FormControlLabel
              sx={sx.radioBtn}
              value="COMPANY"
              control={<Radio />}
              label={t('company')}
            />
            <FormControlLabel
              sx={sx.radioBtn}
              value="COLLECTIVE_PURCHASE"
              control={<Radio />}
              label={t('collectivePurchase')}
            />
          </HFRadioGroup>

          <Box sx={{ ...sx.field, ...sx.phone }}>
            <HFPhoneInput
              name="phone"
              disabled={isCodeSended}
              label={t('phone')}
            />
            <Button
              sx={sx.getCodeBtn}
              onClick={sendSMS}
              disabled={phoneIsInvalid || isCodeSended}
            >
              {t('getCode')}
            </Button>
          </Box>
          {isCodeSended && (
            <Stack sx={sx.field}>
              <HFTextField
                disabled={isCodeSuccess}
                sx={sx.field}
                name="sms"
                onChange={e => {
                  if (e.target.value.length === 4) {
                    checkCode();
                  }
                }}
                label={t('sms')}
              />
              {isCodeSuccess && (
                <Typography variant="body1">Код подтвержден</Typography>
              )}
            </Stack>
          )}

          {isCodeSuccess && (
            <>
              <HFTextField
                sx={sx.field}
                type="text"
                name="firstName"
                label={t('firstName')}
              />
              <HFTextField
                sx={sx.field}
                type="text"
                name="lastName"
                label={t('lastName')}
              />
              <HFTextField
                sx={sx.field}
                type="password"
                name="password"
                label={t('password')}
                helperText={t('passwordHelper')}
              />
              <HFTextField
                sx={sx.field}
                type="password"
                name="passwordConfirm"
                label={t('passwordConfirm')}
              />
              <Checkbox
                sx={sx.field}
                value={isAgree}
                onChange={agree}
                label={t('agreement')}
              />
            </>
          )}
          <Button type="submit" disabled={formIsInvalid} sx={sx.submitBtn}>
            {t('submit')}
          </Button>
        </form>
      </FormProvider>
    </AuthCard>
  );
}
