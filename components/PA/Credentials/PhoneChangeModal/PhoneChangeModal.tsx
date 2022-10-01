import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { useLocalTranslation } from 'hooks/useLocalTranslation';

import { ChangePhoneDto } from 'types/dto/profile/change-phone.dto';
import { getSchema } from './validation';
import translations from './PhoneChangeModal.i18n.json';
import { Modal } from 'components/UI/Modal/Modal';
import { Box } from 'components/UI/Box/Box';
import { Typography } from 'components/UI/Typography/Typography';
import { HFPhoneInput } from 'components/HookForm/HFPhoneInput';

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
  onSubmit(changePhoneData: ChangePhoneDto): void;
};

export function PAPhoneChangeModal({ isOpen, defaultValues, error, onClose, onSubmit }: PAPhoneChangeModalProps) {
  const { t } = useLocalTranslation(translations);

  const schema = getSchema(t);

  const values = useForm<ChangePhoneDto>({
    resolver: yupResolver(schema),
    mode: 'onChange',
    defaultValues,
  });

  const formIsInvalid = !values.formState.isValid;

  const submit = (data: ChangePhoneDto) => onSubmit(data);

  return (
    <Modal
      isOpen={isOpen}
      title={t('title')}
      description={t('description')}
      formId='phoneChangeForm'
      acceptIsDisabled={formIsInvalid}
      onClose={onClose}
    >
      <Box sx={sx.body}>
        <FormProvider {...values}>
          <form id='phoneChangeForm' onSubmit={values.handleSubmit(submit)}>
            <HFPhoneInput label={t('phone')} name='phone' />

            {!!error && (
              <Typography sx={sx.error} variant='body2' color='error'>
                {error}
              </Typography>
            )}
          </form>
        </FormProvider>
      </Box>
    </Modal>
  );
}
