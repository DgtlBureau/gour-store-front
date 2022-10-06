import React, { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import { yupResolver } from '@hookform/resolvers/yup';

import { HFSendField } from 'components/HookForm/HFSendField';
import { HFTextField } from 'components/HookForm/HFTextField';
import { Box } from 'components/UI/Box/Box';
import { Modal } from 'components/UI/Modal/Modal';
import { Typography } from 'components/UI/Typography/Typography';

import { ChangeEmailDto } from 'types/dto/profile/change-email.dto';

import { useLocalTranslation } from 'hooks/useLocalTranslation';

import translations from './EmailChangeModal.i18n.json';
import sx from './EmailChangeModal.styles';
import { getSchema } from './validation';

export type PAEmailChangeModalProps = {
  isOpen: boolean;
  defaultValues?: ChangeEmailDto;
  codeIsSending?: boolean;
  onClose(): void;
  onEmailSend(email: string): Promise<void>;
  onCodeCheck(code: string): Promise<void>;
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
  const [seconds, setSeconds] = useState<number | null>(null);
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
  const emailIsValid = !!values.watch('email') && !values.getFieldState('email').error;
  const formIsValid = values.formState.isValid && isCodeSuccess;
  const sendingIsDisabled = !!seconds || !emailIsValid || !emailIsDirty;

  const intervalRef = React.useRef<NodeJS.Timeout | null>(null);

  const clearTimer = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
  };

  useEffect(() => clearTimer, []);

  useEffect(() => {
    if (seconds && !intervalRef.current) {
      intervalRef.current = setInterval(() => {
        setSeconds(sec => sec && sec - 1);
      }, 1000);
    }
    if (seconds === 0) {
      setSeconds(null);
      clearTimer();
    }
  }, [seconds]);

  const sendEmail = async () => {
    const email = values.getValues('email');

    try {
      await onEmailSend(email);

      setIsCodeSended(true);
      setSeconds(30);
    } catch (e) {
      setIsCodeSended(false);
      values.setError('email', { message: String(e) });
    }
  };

  const checkCode = async (value: string) => {
    if (value.length !== 4) return;

    try {
      await onCodeCheck(value);

      setIsCodeSuccess(true);
    } catch (e) {
      setIsCodeSuccess(false);
      values.setError('code', { message: String(e) });
    }
  };

  const resetEmailStates = () => {
    setSeconds(null);
    setIsCodeSended(false);
    setIsCodeSuccess(false);
    values.resetField('code');
  };

  const changeEmail = () => {
    if (isCodeSended) resetEmailStates();
  };

  const closeModal = () => {
    resetEmailStates();
    onClose();
  };

  const submit = (dto: ChangeEmailDto) => {
    onSubmit(dto);

    values.resetField('email', { defaultValue: dto.email });

    resetEmailStates();
  };

  return (
    <Modal
      isOpen={isOpen}
      title={t('title')}
      description={t('description')}
      formId={formId}
      acceptIsDisabled={!formIsValid}
      onClose={closeModal}
    >
      <Box sx={sx.body}>
        <FormProvider {...values}>
          <form id={formId} onSubmit={values.handleSubmit(submit)}>
            <HFSendField
              label={t('email')}
              name='email'
              onChange={changeEmail}
              isSending={!!codeIsSending}
              sendingIsDisabled={sendingIsDisabled}
              onSend={sendEmail}
            />

            {isCodeSended && !isCodeSuccess && (
              <>
                <HFTextField
                  label={t('code')}
                  name='code'
                  sx={sx.codeField}
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
          </form>
        </FormProvider>
      </Box>
    </Modal>
  );
}
