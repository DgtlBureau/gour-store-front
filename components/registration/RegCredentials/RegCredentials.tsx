import React, { useState } from 'react';
import { Paper, FormControlLabel, Radio } from '@mui/material';
import { useForm, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import translations from './RegCredentials.i18n.json';
import { useLocalTranslation } from "../../../hooks/useLocalTranslation";
import { getSchema, Translator } from './validation';
import { SignUpDto } from '../../../@types/dto/signup.dto';
import { Box } from '../../UI/Box/Box';
import { Button } from '../../UI/Button/Button';
import { Typography } from '../../UI/Typography/Typography';
import { Checkbox } from '../../UI/Checkbox/Checkbox';
import { HFTextField } from '../../HookForm/HFTextField';
import { HFRadioGroup } from '../../HookForm/HFRadioGroup';

import sx from './RegCredentials.styles';

export type RegCredentialsProps = {
  defaultValues: SignUpDto;
  onBack(): void;
  onSendSMS(phone: string): string;
  onSubmit(data: SignUpDto): void;
};

export function RegCredentials({
  defaultValues,
  onBack,
  onSendSMS,
  onSubmit,
}: RegCredentialsProps) {
  const [SMS, setSMS] = useState('');
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [isAgree, setIsAgree] = useState(false);

  const { t } = useLocalTranslation(translations);

  const schema = getSchema(t as Translator);

  const values = useForm<SignUpDto>({
    defaultValues,
    mode: 'onBlur',
    resolver: yupResolver(schema),
  });

  const phoneIsInvalid = !values.watch('phone') || values.getFieldState('phone').invalid;
  const formIsInvalid = !values.formState.isValid || !isConfirmed || !isAgree;

  const sendSMS = () => {
    const phone = values.watch('phone');
    const code = onSendSMS(phone);

    setSMS(code);
  };

  const blurSMSField = () => {
    const code = values.watch('sms');

    if (!code.trim()) values.setError('sms', { message: t('smsEmpty') });
    else if (code !== SMS) values.setError('sms', { message: t('smsError') });
    else values.clearErrors('sms');
    
    const codeIsValid = !values.getFieldState('sms').error;

    setIsConfirmed(codeIsValid);
  };

  const agree = () => setIsAgree(!isAgree);

  const submit = (data: SignUpDto) => onSubmit(data);

  return (
    <FormProvider {...values}>
      <form onSubmit={values.handleSubmit(submit)}>
        <Paper square elevation={0} sx={sx.paper}>
          <Button sx={sx.backBtn} size="small" variant="outlined" onClick={onBack}>{t('back')}</Button>

          <Typography sx={sx.title}>{t('title')}</Typography>

          <HFRadioGroup name="type" sx={sx.radioGroup}>
            {
              ['physical', 'organization', 'procurementOrganizer'].map(type => (
                <FormControlLabel
                  sx={sx.radioBtn}
                  key={type}
                  value={type}
                  control={<Radio />}
                  label={t(type)}
                />
              ))
            }
          </HFRadioGroup>

          <Box sx={{ ...sx.field, ...sx.phone }}>
            <HFTextField name="phone" label={t('phone')} />
            <Button
              sx={sx.getCodeBtn}
              onClick={sendSMS}
              disabled={phoneIsInvalid}
            >
              {t('getCode')}
            </Button>
          </Box>

          {SMS && <HFTextField sx={sx.field} name="sms" label={t('sms')} onBlur={blurSMSField} />}

          <HFTextField sx={sx.field} type="password" name="password" label={t('password')} helperText={t('passwordHelper')} />
          <HFTextField sx={sx.field} type="password" name="passwordConfirm" label={t('passwordConfirm')} />

          <HFTextField sx={sx.field} name="referral" label={t('referral')} />

          <Checkbox sx={sx.field} checked={isAgree} onChange={agree} label={t('agreement')} />

          <Button type="submit" disabled={formIsInvalid}>{t('signUp')}</Button>
        </Paper>
      </form>
    </FormProvider>
  );
}
