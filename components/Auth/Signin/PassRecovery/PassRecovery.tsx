import React, { useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import translations from './PassRecovery.i18n.json';
import { useLocalTranslation } from '../../../../hooks/useLocalTranslation';
import { getSchema } from './validation';
import { PasswordRecoveryDto } from '../../../../@types/dto/password-recovery.dto';
import { AuthCard } from '../../Card/Card';
import { Box } from '../../../UI/Box/Box';
import { Button } from '../../../UI/Button/Button';
import { Typography } from '../../../UI/Typography/Typography';
import { HFTextField } from '../../../HookForm/HFTextField';
import { Translator } from 'utils/Translator';

import sx from './PassRecovery.styles';

export type SigninPassRecoveryProps = {
  defaultValues: PasswordRecoveryDto;
  onBack(): void;
  onSendSMS(phone: string): string;
  onSubmit(data: PasswordRecoveryDto): void;
};

export function SigninPassRecovery({
  defaultValues,
  onBack,
  onSendSMS,
  onSubmit,
}: SigninPassRecoveryProps) {
  const [SMS, setSMS] = useState('');
  const [isConfirmed, setIsConfirmed] = useState(false);

  const { t } = useLocalTranslation(translations);

  const schema = getSchema(t as Translator);

  const values = useForm<PasswordRecoveryDto>({
    defaultValues,
    mode: 'onBlur',
    resolver: yupResolver(schema),
  });

  const phoneIsInvalid =
    !values.watch('phone') || !!values.getFieldState('phone').error;
  const formIsInvalid = !values.formState.isValid || !isConfirmed;

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

  const submit = (data: PasswordRecoveryDto) => onSubmit(data);

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

          {SMS && (
            <HFTextField
              sx={sx.field}
              name="sms"
              label={t('sms')}
              onBlur={blurSMSField}
            />
          )}

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

          <Button type="submit" disabled={formIsInvalid} sx={sx.submitBtn}>
            {t('submit')}
          </Button>
        </form>
      </FormProvider>
    </AuthCard>
  );
}
