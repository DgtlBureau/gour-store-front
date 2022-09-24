import React, { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { useGetInvoicePriceQuery } from 'store/api/invoiceApi';
import { payInvoiceDto } from 'types/dto/invoice/payInvoice.dto';
import { useDebounce } from 'hooks/useDebounce';
import { useLocalTranslation } from 'hooks/useLocalTranslation';
import { getCurrencySymbol } from 'helpers/currencyHelper';
import regexp from 'constants/regex';

import { Typography } from 'components/UI/Typography/Typography';
import { Box } from 'components/UI/Box/Box';
import { Modal } from 'components/UI/Modal/Modal';
import { HFTextField } from 'components/HookForm/HFTextField';
import { Button } from 'components/UI/Button/Button';

import { getValidationSchema } from './validations';
import translations from './AddModal.i18n.json';

import { sx } from './AddModal.styles';
import Loader from 'components/UI/Loader/Loader';

type Props = {
  isOpened: boolean;
  onClose: () => void;
  onSubmit: (data: payInvoiceDto) => void;
};

export function CheesecoinsAddModal({ isOpened, onClose, onSubmit }: Props) {
  const [lastCoinCount, setLastCoinCount] = useState(0);

  const debouncedValue = useDebounce(lastCoinCount, 500);

  const { t } = useLocalTranslation(translations);

  const schema = getValidationSchema(t);
  const values = useForm<payInvoiceDto>({
    resolver: yupResolver(schema),
    mode: 'onBlur',
  });

  const isValidCoinsCount = values.formState.isValid || !!debouncedValue;
  const {
    data: invoicePrice,
    isFetching,
    isError,
  } = useGetInvoicePriceQuery({ count: debouncedValue, currency: 'rub' }, { skip: !isValidCoinsCount });

  const currencySymbol = getCurrencySymbol('rub');

  const showPrice = !isFetching && !isError && !!debouncedValue;

  return (
    <Modal title='Покупка чизкоинов' isOpen={isOpened} onClose={onClose}>
      <FormProvider {...values}>
        <form onSubmit={values.handleSubmit(onSubmit)}>
          <HFTextField
            name='count'
            label='Баланс чизкоинов'
            regexp={regexp.onlyDigits}
            onChange={e => setLastCoinCount(+e.currentTarget.value)}
            inputProps={{ maxLength: 12 }}
          />

          {isError && (
            <Typography variant='body2' color='error' sx={sx.error}>
              Server error.
            </Typography>
          )}

          {isFetching && (
            <Box sx={sx.loader}>
              <Loader width='58px' height='10px' />
            </Box>
          )}

          {showPrice && (
            <Typography variant='body1' sx={sx.price}>
              Стоимость пополнения:&ensp;
              <Typography variant='caption' sx={sx.priceValue}>
                {invoicePrice}&nbsp;{currencySymbol}
              </Typography>
            </Typography>
          )}

          <Box sx={sx.buttonGroup}>
            <Button sx={sx.button} type='submit' disabled={isFetching}>
              Пополнить
            </Button>

            <Button sx={sx.button} variant='outlined' size='small' onClick={onClose} disabled={isFetching}>
              Отменить
            </Button>
          </Box>
        </form>
      </FormProvider>
    </Modal>
  );
}
