import React, { useState, useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Divider } from '@mui/material';

import SendIcon from '@mui/icons-material/Send';

import { getSchema } from './validation';
import translations from './PhoneChangeModal.i18n.json';
import { useLocalTranslation } from "../../../hooks/useLocalTranslation";
import { Modal } from '../../UI/Modal/Modal';
import { Box } from '../../UI/Box/Box';
import { HFTextField } from '../../HookForm/HFTextField';
import { Typography } from '../../UI/Typography/Typography';
import { IconButton } from '../../UI/IconButton/IconButton';
import { PhoneChangeDto } from '../../../@types/dto/phone-change.dto';

const sx = {
  body: {
    marginTop: '14px',
  },
  smsField: {
    marginTop: '8px',
  },
  timer: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '8px',
    color: 'text.muted',
  },
  divider: {
    height: 28,
    marginRight: '14px',
  },
}

export type PhoneChangeModalProps = {
  isOpen: boolean;
  defaultValues?: PhoneChangeDto;
  onClose(): void;
  onSendSMS(phone: string): string;
  onSubmit(data: PhoneChangeDto): void;
};

export function PhoneChangeModal({
  isOpen,
  defaultValues,
  onClose,
  onSendSMS,
  onSubmit,
}: PhoneChangeModalProps) {
  const [sms, setSMS] = useState('');
  const [seconds, setSeconds] = useState(0);
  const [isConfirmed, setIsConfirmed] = useState(false);

  const { t } = useLocalTranslation(translations);

  const schema = getSchema(t);

  const values = useForm<PhoneChangeDto>({
    resolver: yupResolver(schema),
    mode: 'onBlur',
    defaultValues,
  });

  const formIsInvalid = !values.formState.isValid || !isConfirmed;
  const sendingIsDisabled = !!seconds || !values.watch('phone') || !!values.getFieldState('phone').error;

  const startTimer = () => {
    setSeconds(30);

    let intervalId = +setInterval(() => {
      setSeconds(seconds => seconds - 1);
    }, 1000);

    setTimeout(() => clearInterval(intervalId), 30000);
  }

  const sendSMS = () => {
    if (seconds !== 0) return;

    const phone = values.watch('phone');
    const code = onSendSMS(phone);

    setSMS(code);
    startTimer();
  }

  const blurSMSField = () => {
    const code = values.watch('sms');

    if (!code.trim()) values.setError('sms', { message: t('smsEmpty') });
    else if (code !== sms) values.setError('sms', { message: t('smsError') });
    else values.clearErrors('sms');
    
    const codeIsValid = !values.getFieldState('sms').error;

    setIsConfirmed(codeIsValid);
  };

  const submit = (data: PhoneChangeDto) => onSubmit(data);

  return (
    <Modal
      isOpen={isOpen}
      title={t('title')}
      description={t('description')}
      formId="phoneChangeForm"
      acceptIsDisabled={formIsInvalid}
      onClose={onClose}
      body={
        <Box sx={sx.body}>
          <FormProvider {...values}>
            <form id="phoneChangeForm" onSubmit={values.handleSubmit(submit)}>
              <HFTextField
                label={t('phone')}
                name="phone"
                InputProps={{
                  endAdornment: (
                    <>
                      <Divider sx={sx.divider} orientation="vertical" />
                      <IconButton
                        onClick={sendSMS}
                        color="primary"
                        disabled={sendingIsDisabled}
                      >
                        <SendIcon />
                      </IconButton>
                    </>
                  ),
                }}
              />
              {
                !!sms && (
                  <HFTextField
                    label={t('sms')}
                    name="sms"
                    onBlur={blurSMSField}
                    sx={sx.smsField}
                  />
                )
              }
              {
                seconds !== 0 && (
                  <Box sx={sx.timer}>
                    <Typography variant="body2">
                      {t('smsHelper')}
                    </Typography>
                    <Typography variant="body2">
                      {seconds}
                      {' '}
                      {t('seconds')}
                    </Typography>
                  </Box>
                )
              }
            </form>
          </FormProvider>
        </Box>
      }
    />
  );
}
