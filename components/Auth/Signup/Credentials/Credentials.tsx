import React, { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import { yupResolver } from '@hookform/resolvers/yup';
import { FormControlLabel, Radio } from '@mui/material';

import { AuthCard } from 'components/Auth/Card/Card';
import { HFCodeInput } from 'components/HookForm/HFCodeInput';
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
import { IClientRole } from 'types/entities/IClientRole';

import { Path } from 'constants/routes';
import { useLocalTranslation } from 'hooks/useLocalTranslation';
import { useStopwatch } from 'hooks/useStopwatch';

import translations from './Credentials.i18n.json';
import { getSchema } from './validation';

import sx from './Credentials.styles';
import { IOption } from '../../../../types/entities/IOption';
import { HFSelect } from '../../../HookForm/HFSelect';

export type SignupCredentialsProps = {
  roles: IClientRole[];
  defaultValues?: SignUpFormDto;
  codeIsSending?: boolean;
  onBack(): void;
  onEmailSend(email: string): Promise<void>;
  onCodeCheck(code: string): Promise<boolean>;
  onSubmit(data: SignUpFormDto): void;
  city?: string;
  cityOptions: IOption[];
};

export function SignupCredentials({
  roles,
  defaultValues,
  codeIsSending,
  onBack,
  onEmailSend,
  onCodeCheck,
  onSubmit,
  cityOptions
}: SignupCredentialsProps) {
  const [isCodeSended, setIsCodeSended] = useState(false);
  const [isCodeSuccess, setIsCodeSuccess] = useState(false);

  const [isAgree, setIsAgree] = useState(false);

  const { t } = useLocalTranslation(translations);

  const schema = getSchema(t);

  const values = useForm<SignUpFormDto>({
    defaultValues: {
      ...defaultValues,
      city: cityOptions[0]?.value,
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
    // resetEmailStates();
  };

  return (
    <AuthCard>
      <FormProvider {...values}>
        <form onSubmit={values.handleSubmit(submit)}>
          <Button sx={sx.backBtn} size='small' variant='outlined' onClick={onBack}>
            {t('back')}
          </Button>

          {!isCodeSuccess && (
            <>
              <Typography sx={sx.title}>{t('title')}</Typography>
              <Box sx={{ ...sx.field, ...sx.phone, padding: '10px 0 0 0 ' }}>
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
            </>
          )}

          {isCodeSended && !isCodeSuccess && (
            <>
              <HFCodeInput sx={sx.codeField} name='code' onChange={checkCode} />

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
              <Typography sx={sx.title} >Вы...</Typography>
              <HFRadioGroup name='role' sx={sx.radioGroup}>
                {roles.map(role => (
                    <FormControlLabel sx={sx.radioBtn} key={role.id} value={role.key} control={<Radio />} label={role.title} />
                ))}
              </HFRadioGroup>
              <HFTextField sx={sx.field} type='text' name='firstName' label={t('firstName')} />
              <HFTextField sx={sx.field} type='text' name='lastName' label={t('lastName')} />
              <HFPassField sx={sx.field} name='password' label={t('password')} helperText={t('passwordHelper')} />
              <HFPassField sx={sx.field} name='passwordConfirm' label={t('passwordConfirm')} />
              <HFSelect options={cityOptions} name='city' label={t('city')} sx={sx.select} />

              <HFTextField
                  sx={sx.field}
                  type='text'
                  name='referralCode'
                  label={t('referralCode')}
                  helperText={t('referralCodeHelper')}
              />

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
