import React, { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Divider } from '@mui/material';

import SendIcon from '@mui/icons-material/Send';

import { getSchema } from './validation';
import translations from './PhoneChangeModal.i18n.json';
import { useLocalTranslation } from '../../../../hooks/useLocalTranslation';
import { Modal } from '../../../UI/Modal/Modal';
import { Box } from '../../../UI/Box/Box';
import { HFTextField } from '../../../HookForm/HFTextField';
import { Typography } from '../../../UI/Typography/Typography';
import { IconButton } from '../../../UI/IconButton/IconButton';
import { PhoneChangeDto } from '../../../../@types/dto/phone-change.dto';

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
  error: {
    marginTop: '8px',
  },
  divider: {
    height: 28,
    marginRight: '14px',
  },
};

export type PAPhoneChangeModalProps = {
  isOpen: boolean;
  defaultValues?: PhoneChangeDto;
  error?: string;
  onClose(): void;
  onSendSMS(phone: string): void;
  onSubmit(data: PhoneChangeDto): void;
};

export function PAPhoneChangeModal({
  isOpen,
  defaultValues,
  error,
  onClose,
  onSendSMS,
  onSubmit,
}: PAPhoneChangeModalProps) {
  const [seconds, setSeconds] = useState(0);

  const { t } = useLocalTranslation(translations);

  const schema = getSchema(t);

  const values = useForm<PhoneChangeDto>({
    resolver: yupResolver(schema),
    mode: 'onBlur',
    defaultValues,
  });

  const formIsInvalid = !values.formState.isValid;
  const sendingIsDisabled = !!seconds || !values.watch('phone') || !!values.getFieldState('phone').error;

  const startTimer = () => {
    setSeconds(30);

    let intervalId = setInterval(() => {
      setSeconds(seconds => seconds - 1);
    }, 1000);

    setTimeout(() => clearInterval(intervalId), 30000);
  };

  const sendSMS = () => {
    if (seconds !== 0) return;

    const phone = values.watch('phone');

    onSendSMS(phone);

    startTimer();
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
                      <IconButton onClick={sendSMS} color="primary" disabled={sendingIsDisabled}>
                        <SendIcon />
                      </IconButton>
                    </>
                  ),
                }}
              />
              <HFTextField label={t('sms')} name="sms" sx={sx.smsField} />
              {seconds !== 0 && (
                <Box sx={sx.timer}>
                  <Typography variant="body2">{t('smsHelper')}</Typography>
                  <Typography variant="body2">
                    {seconds} {t('seconds')}
                  </Typography>
                </Box>
              )}
              {!!error && (
                <Typography sx={sx.error} variant="body2" color="error">
                  {error}
                </Typography>
              )}
            </form>
          </FormProvider>
        </Box>
      }
    />
  );
}
