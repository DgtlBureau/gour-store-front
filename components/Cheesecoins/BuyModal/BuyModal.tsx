import Image from 'next/image';
import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import { yupResolver } from '@hookform/resolvers/yup';
import { Grid, useMediaQuery } from '@mui/material';

import { HFCheckbox } from 'components/HookForm/HFCheckbox';
import { HFMaskInput } from 'components/HookForm/HFMaskInput';
import { HFPassField } from 'components/HookForm/HFPassField/HFPassField';
import { HFTextField } from 'components/HookForm/HFTextField';
import { Box } from 'components/UI/Box/Box';
import { Modal } from 'components/UI/Modal/Modal';
import { Typography } from 'components/UI/Typography/Typography';

import { PayInvoiceDto } from 'types/dto/invoice/payInvoice.dto';

import { useLocalTranslation } from 'hooks/useLocalTranslation';
import { getCurrencySymbol } from 'utils/currencyUtil';

import coinImage from 'assets/icons/cheesecoins/coin.svg';
import regexp from 'constants/regex';

import translations from './BuyModal.i18n.json';
import { sx } from './BuyModal.styles';
import { formMasks, getExpDate, getValidationSchema } from './validations';

type FormState = Pick<PayInvoiceDto, 'cardNumber' | 'cvv' | 'invoiceEmail'> & {
  expDate: string;
  isSendInvoice: boolean;
};

type Props = {
  isOpened: boolean;
  onClose: () => void;
  onSubmit: (data: PayInvoiceDto) => void;
  userEmail?: string;
  price: number | null;
  isLoading: boolean;
};

export function BuyCheeseCoinsModal({ isOpened, onClose, price = 5000, userEmail, isLoading, onSubmit }: Props) {
  const { t } = useLocalTranslation(translations);
  const isDesktop = useMediaQuery('(min-width: 600px)');

  const schema = getValidationSchema(t);
  const values = useForm<FormState>({
    resolver: yupResolver(schema),
    mode: 'onBlur',
    defaultValues: {
      invoiceEmail: userEmail,
    },
  });

  const handleSubmit = (formData: FormState) => {
    const [expDateMonth, expDateYear] = getExpDate(formData.expDate) as readonly [number, number];
    const submitData: PayInvoiceDto = {
      cardNumber: formData.cardNumber,
      expDateMonth,
      expDateYear,
      cvv: formData.cvv,
      price: price!,
      ...(formData.isSendInvoice && { invoiceEmail: formData.invoiceEmail }),
    };

    onSubmit(submitData);
  };

  const currencySymbol = getCurrencySymbol('rub');
  const formId = 'buy-coins-modal';

  const acceptText = (
    <>
      ОПЛАТИТЬ {price}&nbsp;{currencySymbol}
    </>
  );

  const showEmailInput = values.watch('isSendInvoice');
  const coinIconSize = isDesktop ? 74 : 62;

  return (
    <Modal
      isOpen={isOpened}
      title={
        <Box sx={sx.titleContainer}>
          <Box sx={sx.imageBlock}>
            <Image src={coinImage} width={coinIconSize} height={coinIconSize} layout='fixed' />
          </Box>

          <Box>
            <Typography variant='h6' color='text.secondary' sx={sx.titleLabel}>
              Покупка виртуальной игровой валюты
            </Typography>
            <Typography variant='body1' color='text.muted' sx={sx.titlePrice}>
              {price}&nbsp;₡ — {price}&nbsp;₽
            </Typography>
          </Box>
        </Box>
      }
      acceptText={isLoading ? 'Происходит оплата' : acceptText}
      acceptIsDisabled={isLoading}
      closeIsDisabled={isLoading}
      formId={formId}
      onClose={onClose}
    >
      <FormProvider {...values}>
        <form id={formId} onSubmit={values.handleSubmit(handleSubmit)} autoComplete='off' noValidate>
          <Grid container spacing={3} marginBottom='24px'>
            <Grid item xs={12}>
              <HFMaskInput
                name='cardNumber'
                label='Номер карты'
                mask={formMasks.cardNumber}
                inputProps={{ inputMode: 'numeric' }}
              />
            </Grid>

            <Grid item xs={12} container spacing={2}>
              <Grid item xs={6}>
                <HFMaskInput
                  name='expDate'
                  label='ММ / ГГ'
                  mask={formMasks.expDate}
                  inputProps={{ inputMode: 'numeric' }}
                />
              </Grid>

              <Grid item xs={6}>
                <HFPassField
                  name='cvv'
                  label='CVV'
                  regexp={regexp.onlyDigits}
                  inputProps={{ maxLength: 3, inputMode: 'numeric' }}
                />
              </Grid>
            </Grid>

            <Grid item xs={12}>
              <HFCheckbox name='isSendInvoice' label={t('isMain') || 'Отправить квитанцию на почту'} />
            </Grid>

            {showEmailInput && (
              <Grid item xs={12}>
                <HFTextField name='invoiceEmail' label='E-mail' type='email' />
              </Grid>
            )}
          </Grid>
        </form>
      </FormProvider>
    </Modal>
  );
}
