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
import { HFPhoneInput } from '../../../HookForm/HFPhoneInput';
import { SendCodeDto } from '../../../../@types/dto/profile/send-code.dto';
import { ChangePhoneDto } from '../../../../@types/dto/profile/change-phone.dto';

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
  defaultValues?: ChangePhoneDto;
  error?: string;
  onClose(): void;
  onSendSMS(phone: SendCodeDto): Promise<boolean>;
  onSubmit(changePhoneData: ChangePhoneDto): void;
};

export function PAPhoneChangeModal({
  isOpen,
  defaultValues,
  error,
  onClose,
  onSendSMS,
  onSubmit,
}: PAPhoneChangeModalProps) {
  const [isCodeSended, setIsCodeSended] = useState(false);
  const [seconds, setSeconds] = useState(0);

  const { t } = useLocalTranslation(translations);

  const schema = getSchema(t);

  const values = useForm<ChangePhoneDto>({
    resolver: yupResolver(schema),
    mode: 'onChange',
    defaultValues,
  });

  const formIsInvalid = !values.formState.isValid;
  const sendingIsDisabled =
    !!seconds ||
    !values.watch('phone') ||
    !!values.getFieldState('phone').error;

  const startTimer = () => {
    setSeconds(30);

    let intervalId = setInterval(() => {
      setSeconds(seconds => seconds - 1);
    }, 1000);

    setTimeout(() => clearInterval(intervalId), 30000);
  };

  const sendSMS = async () => {
    if (seconds !== 0) return;
    const phone = values.watch('phone');
    const code = await onSendSMS({ phone });
    if (code) {
      setIsCodeSended(code);
      startTimer();
    }
  };

  const submit = (data: ChangePhoneDto) => onSubmit(data);

  return (
    <Modal
      isOpen={isOpen}
      title={t('title')}
      description={t('description')}
      formId="phoneChangeForm"
      acceptIsDisabled={formIsInvalid}
      onClose={onClose}
    >
      <Box sx={sx.body}>
        <FormProvider {...values}>
          <form id="phoneChangeForm" onSubmit={values.handleSubmit(submit)}>
            <HFPhoneInput
              label={t('phone')}
              name="phone"
              endAdornment={
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
              }
            />
            {isCodeSended && (
              <HFTextField label={t('sms')} name="sms" sx={sx.smsField} />
            )}
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
    </Modal>
  );
}
