import React, { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import { yupResolver } from '@hookform/resolvers/yup';

import { HFSendField } from 'components/HookForm/HFSendField/HFSendField';
import { HFTextField } from 'components/HookForm/HFTextField';
import { Box } from 'components/UI/Box/Box';
import { Modal } from 'components/UI/Modal/Modal';
import { Typography } from 'components/UI/Typography/Typography';

import { ChangeEmailDto } from 'types/dto/profile/change-email.dto';

import { useLocalTranslation } from 'hooks/useLocalTranslation';
import { useStopwatch } from 'hooks/useStopwatch';

import translations from './EmailChangeModal.i18n.json';
import { getSchema } from './validation';

import sx from './EmailChangeModal.styles';

export type PAEmailChangeModalProps = {
  isOpen: boolean;
  defaultValues?: ChangeEmailDto;
  codeIsSending?: boolean;
  onClose(): void;
  onEmailSend(email: string): Promise<void>;
  onCodeCheck(code: string): Promise<boolean>;
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
  const [isCodeSended, setIsCodeSended] = useState(false);
  const [isCodeSuccess, setIsCodeSuccess] = useState(false);

  const { t } = useLocalTranslation(translations);

  const { seconds, startCount, stopCount } = useStopwatch(30);

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
  const sendingIsDisabled = !!seconds || !emailIsValid || !emailIsDirty || isCodeSuccess;

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

  const resetEmailStates = () => {
    stopCount();
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
      showRefuseButton
      acceptIsDisabled={!formIsValid}
      onClose={closeModal}
    >
      <Box sx={sx.body}>
        <FormProvider {...values}>
          <form id={formId} onSubmit={values.handleSubmit(submit)}>
            <HFSendField
              label={t('email')}
              name='email'
              isSending={!!codeIsSending}
              disabled={isCodeSuccess}
              sendingIsDisabled={sendingIsDisabled}
              onChange={changeEmail}
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
