import React, { useEffect, useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Grid } from '@mui/material';

import { getValidationSchema } from './validation';
import { Box } from '../UI/Box/Box';
import { Typography } from '../UI/Typography/Typography';
import { Button } from '../UI/Button/Button';
import { Checkbox } from '../UI/Checkbox/Checkbox';
import { HFTextField } from '../HookForm/HFTextField';
import { HFSelect } from '../HookForm/HFSelect';
import { HFTextarea } from '../HookForm/HFTextarea';
import { OrderFormDocket } from './FormDocket';
import { defaultTheme as theme } from '../../themes';
import { useLocalTranslation } from '../../hooks/useLocalTranslation';
import translations from './Form.i18n.json';
import { IOrderProfile } from '../../@types/entities/IOrderProfile';

const sx = {
  form: {
    width: '100%',
  },
  block: {
    marginBottom: '40px',
  },
  title: {
    marginBottom: '20px',
    fontWeight: 'bold',
    fontFamily: 'Roboto slab',
    color: theme.palette.text.secondary,
  },
  promo: {
    display: 'flex',
    alignItems: 'center',
    marginTop: '20px',
  },
  promoText: {
    color: theme.palette.text.muted,
  },
  select: {
    marginBottom: '20px',
  },
  textarea: {
    margin: 0,
  },
  btn: {
    width: '100%',
  },
  agreement: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '20px',
    color: theme.palette.text.muted,
  },
};

const contactsFields = ['firstName', 'lastName', 'phone', 'email'];

const addressFields = [
  'city',
  'street',
  'house',
  'apartment',
  'entrance',
  'floor',
];

export type OrderFields = {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;

  deliveryProfile: number;
  city: string;
  street: string;
  house: string;
  apartment: string;
  entrance: string;
  floor: string;

  comment: string;
};

export type OrderFormProps = {
  order: OrderFields;
  productsCount: number;
  cost: number;
  discount?: number;
  isSubmitError?: boolean;
  delivery: number;
  deliveryProfiles: IOrderProfile[];
  currency?: 'rub' | 'usd' | 'eur';
  onSubmit: (data: OrderFields) => void;
  onChangeDeliveryProfile: (profileId: number) => void;
};

export function OrderForm({
  order,
  productsCount,
  cost,
  discount,
  delivery,
  deliveryProfiles,
  isSubmitError,
  onChangeDeliveryProfile,
  currency,
  onSubmit,
}: OrderFormProps) {
  const { t } = useLocalTranslation(translations);
  const [isAgree, setIsAgree] = useState(false);
  const schema = getValidationSchema(t);

  const values = useForm<OrderFields>({
    resolver: yupResolver(schema),
    mode: 'onBlur',
    defaultValues: order,
  });

  useEffect(() => {
    values.reset(order);
  }, [order]);

  const submitHandler = (data: OrderFields) => onSubmit(data);

  const agree = () => setIsAgree(!isAgree);

  const deliveryProfileOptions = deliveryProfiles.map(profile => ({
    label: profile.title,
    value: profile.id,
  }));

  return (
    <FormProvider {...values}>
      <form onSubmit={values.handleSubmit(submitHandler)}>
        <Box sx={sx.form}>
          <Box sx={sx.block}>
            <Typography variant="h6" sx={sx.title}>
              {t('details')}
            </Typography>

            <Grid container spacing={1}>
              {contactsFields.map(field => (
                <Grid key={field} item xs={6}>
                  <HFTextField name={field} label={t(field)} />
                </Grid>
              ))}
            </Grid>
          </Box>

          <Box sx={sx.block}>
            <Typography variant="h6" sx={sx.title}>
              {t('address')}
            </Typography>

            {deliveryProfiles.length !== 0 && (
              <HFSelect
                name="deliveryProfile"
                options={deliveryProfileOptions}
                placeholder={t('profileSelect')}
                sx={sx.select}
              />
            )}

            <Grid container spacing={1}>
              {addressFields.map(field => (
                <Grid key={field} item xs={6}>
                  <HFTextField name={field} label={t(field)} />
                </Grid>
              ))}
              <Grid item xs>
                <HFTextarea
                  sx={sx.textarea}
                  name="comment"
                  label={t('commet')}
                  placeholder={t('commentPlaceholder')}
                />
              </Grid>
            </Grid>

            <OrderFormDocket
              productsCount={productsCount}
              cost={cost}
              discount={discount}
              delivery={delivery}
              currency={currency}
            />

            <Checkbox
              sx={sx.agreement}
              label={t('agreement')}
              checked={isAgree}
              onChange={agree}
            />

            <Button
              sx={sx.btn}
              type="submit"
              disabled={!values.formState.isValid || !isAgree}
              color={!isSubmitError ? 'primary' : 'error'}
            >
              {!isSubmitError ? t('toPay') : t('orderError')}
            </Button>
          </Box>
        </Box>
      </form>
    </FormProvider>
  );
}
