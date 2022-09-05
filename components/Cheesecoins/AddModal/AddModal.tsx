import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useLocalTranslation } from 'hooks/useLocalTranslation';
import { yupResolver } from '@hookform/resolvers/yup';
import { Modal } from 'components/UI/Modal/Modal';
import { HFTextField } from 'components/HookForm/HFTextField';
import { AddCheesecoinsDto } from 'types/dto/cheseecoins/add.dto';
import { Button } from 'components/UI/Button/Button';
import { sx } from './AddModal.styles';
import { getValidationSchema } from './validations';

import translations from './AddModal.i18n.json';

type Props = {
  isOpened: boolean;
  onClose: () => void;
  title: string;
  onSubmit: (data: AddCheesecoinsDto) => void;
};

export function CheesecoinsAddModal({ isOpened, onClose, title, onSubmit }: Props) {
  const { t } = useLocalTranslation(translations);

  const schema = getValidationSchema(t);
  const values = useForm<AddCheesecoinsDto>({
    resolver: yupResolver(schema),
    mode: 'onBlur',
  });

  return (
    <Modal title={title} isOpen={isOpened} onClose={onClose}>
      <FormProvider {...values}>
        <form onSubmit={values.handleSubmit(onSubmit)}>
          <HFTextField name='count' label='Баланс чизкоинов' type='number' />
          <Button sx={sx.button} type='submit'>
            Пополнить счет
          </Button>
        </form>
      </FormProvider>
    </Modal>
  );
}
