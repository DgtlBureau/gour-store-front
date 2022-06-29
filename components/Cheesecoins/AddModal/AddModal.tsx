import { Modal } from '../../../components/UI/Modal/Modal';
import React from 'react';
import { HFTextField } from '../../HookForm/HFTextField';
import { FormProvider, useForm } from 'react-hook-form';
import { AddCheesecoinsDto } from '../../../@types/dto/cheseecoins/add.dto';
import { Button } from '../../UI/Button/Button';
import { sx } from './AddModal.styles';
import { getValidationSchema } from './validations';
import { useLocalTranslation } from 'hooks/useLocalTranslation';

import translations from './AddModal.i18n.json';
import { yupResolver } from '@hookform/resolvers/yup';

type Props = {
  isOpened: boolean;
  onClose: () => void;
  title: string;
  onSubmit: (data: AddCheesecoinsDto) => void;
};

export const CheesecoinsAddModal = ({
  isOpened,
  onClose,
  title,
  onSubmit,
}: Props) => {
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
          <HFTextField name="count" label="Сырные монетки" type="number" />
          <Button sx={sx.button} type="submit">
            Пополнить сырный счет
          </Button>
        </form>
      </FormProvider>
    </Modal>
  );
};
