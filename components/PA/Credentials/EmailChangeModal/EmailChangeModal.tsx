import React, { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { CircularProgress, Divider } from '@mui/material';

import SendIcon from '@mui/icons-material/Send';

import { useLocalTranslation } from 'hooks/useLocalTranslation';
import { getSchema } from './validation';
import translations from './EmailChangeModal.i18n.json';
import { Modal } from 'components/UI/Modal/Modal';
import { Box } from 'components/UI/Box/Box';
import { HFTextField } from 'components/HookForm/HFTextField';
import { Typography } from 'components/UI/Typography/Typography';
import { IconButton } from 'components/UI/IconButton/IconButton';
import { ChangeEmailDto } from 'types/dto/profile/change-email.dto';

import sx from './EmailChangeModal.styles';

export type PAEmailChangeModalProps = {
  isOpen: boolean;
  defaultValues?: ChangeEmailDto;
  codeIsSending?: boolean;
  onClose(): void;
  onEmailSend(email: string): Promise<boolean>;
  onCodeCheck: (code: string) => Promise<boolean>;
  onSubmit(changeEmailData: ChangeEmailDto): void;
};

export function PAEmailChangeModal({
  isOpen,
  defaultValues,
  codeIsSending,
  onClose,
  onEmailSend,
  onCodeCheck,
  onSubmit,
}: PAEmailChangeModalProps) {
  const [seconds, setSeconds] = useState(0);
  const [isCodeSended, setIsCodeSended] = useState(false);
  const [isCodeSuccess, setIsCodeSuccess] = useState(false);

  const { t } = useLocalTranslation(translations);

  const schema = getSchema(t);

  const values = useForm<ChangeEmailDto>({
    resolver: yupResolver(schema),
    mode: 'onChange',
    defaultValues,
  });

  const formId = 'emailChangeForm';

  const emailIsDirty = values.formState.dirtyFields.email;
  const timerIsOn = seconds > 0;
  const emailIsValid = !!values.watch('email') && !values.getFieldState('email').error;
  const formIsValid = values.formState.isValid && isCodeSuccess;
  const sendingIsDisabled = timerIsOn || !emailIsValid || isCodeSuccess || !emailIsDirty;

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
    const isSuccess = await onCodeCheck(code);

    setIsCodeSuccess(isSuccess);
  };

  const changeCode = (value: string) => {
    if (value.length === 4) checkCode();
  };

  const submit = (dto: ChangeEmailDto) => {
    onSubmit(dto);
    setSeconds(0);
    setIsCodeSended(false);
    setIsCodeSuccess(false);
    values.resetField('email', { defaultValue: dto.email });
  };

  return (
    <Modal
      isOpen={isOpen}
      title={t('title')}
      description={t('description')}
      formId={formId}
      acceptIsDisabled={!formIsValid}
      onClose={onClose}
    >
      <Box sx={sx.body}>
        <FormProvider {...values}>
          <form id={formId} onSubmit={values.handleSubmit(submit)}>
            <HFTextField
              label={t('email')}
              name='email'
              disabled={isCodeSuccess}
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

            {isCodeSended && !isCodeSuccess && (
              <>
                <HFTextField
                  label={t('code')}
                  name='code'
                  sx={sx.codeField}
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
          </form>
        </FormProvider>
      </Box>
    </Modal>
  );
}
