import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import { yupResolver } from '@hookform/resolvers/yup';
import { CircularProgress, Grid } from '@mui/material';

import { HFPhoneInput } from 'components/HookForm/HFPhoneInput';
import { IconButton } from 'components/UI/IconButton/IconButton';
import { LinkRef as Link } from 'components/UI/Link/Link';
import { SelectOption } from 'components/UI/Select/Select';

import { noExistingId } from 'constants/default';
import { Path } from 'constants/routes';
import { useLocalTranslation } from 'hooks/useLocalTranslation';

import { HFSelect } from '../../HookForm/HFSelect';
import { HFTextField } from '../../HookForm/HFTextField';
import { Box } from '../../UI/Box/Box';
import { Button } from '../../UI/Button/Button';
import { Checkbox } from '../../UI/Checkbox/Checkbox';
import { Typography } from '../../UI/Typography/Typography';
import translations from './Form.i18n.json';
import { getValidationSchema } from './validation';

import sx from './Form.styles';

import DoneIcon from '@mui/icons-material/Done';

const addressFields = ['street', 'house', 'apartment', 'entrance', 'floor'];

export type OrderFormType = {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  promoCode?: string;
  deliveryProfileId: number;
  cityId: number;
  street: string;
  house: string;
  apartment: string;
  entrance: string;
  floor: string;
  comment?: string;
};

export type PersonalFields = {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  promoCodeId?: number;
};

export type DeliveryFields = {
  deliveryProfileId: number;
  cityId: number;
  street: string;
  house: string;
  apartment: string;
  entrance: string;
  floor: string;
  comment?: string;
};

export type OrderFormProps = {
  defaultPersonalFields: PersonalFields;
  defaultDeliveryFields: DeliveryFields;
  cities: SelectOption[];
  isSubmitError?: boolean;
  isFetching: boolean;
  isSBPFetching: boolean;
  isPromoCodeApplies: boolean;
  deliveryProfiles: SelectOption[];
  onAddPromoCode: (key: string) => void;
  onSubmit: (data: OrderFormType) => void;
  onSelectDeliveryProfile: (id: number) => void;
  onChangeDeliveryCity: (id: number | null) => void;
  handleClickSBPButton: (data: OrderFormType) => void;
};

export function OrderForm({
  defaultPersonalFields,
  defaultDeliveryFields,
  deliveryProfiles,
  isSubmitError,
  isFetching,
  isSBPFetching,
  isPromoCodeApplies,
  cities,
  onAddPromoCode,
  onSelectDeliveryProfile,
  onChangeDeliveryCity,
  onSubmit,
  handleClickSBPButton,
}: OrderFormProps) {
  const { t } = useLocalTranslation(translations);

  const schema = getValidationSchema(t);

  const [isAgree, setIsAgree] = useState(false);

  const values = useForm<OrderFormType>({
    resolver: yupResolver(schema),
    mode: 'onBlur',
    defaultValues: {
      ...defaultPersonalFields,
      ...defaultDeliveryFields,
    },
  });

  useEffect(() => {
    values.reset({
      ...values.getValues(),
      ...defaultDeliveryFields,
    });
  }, [defaultDeliveryFields]);

  useEffect(() => {
    values.reset({
      ...values.getValues(),
      ...defaultPersonalFields,
    });
  }, [defaultPersonalFields]);

  useEffect(() => {
    const subscription = values.watch(({ cityId, deliveryProfileId }) => {
      if (cityId && cityId !== noExistingId) {
        onChangeDeliveryCity(cityId);
        return;
      }
      onChangeDeliveryCity(null);
    });
    return () => subscription.unsubscribe();
  }, [values.watch]);

  const addPromoCode = async () => {
    const promoCodeKey = values.getValues('promoCode');

    if (promoCodeKey) onAddPromoCode(promoCodeKey);
  };

  const changeDeliveryProfile = () => values.setValue('deliveryProfileId', -1);

  const agree = () => setIsAgree(!isAgree);

  const isSubmitBtnDisabled = !values.formState.isValid || !isAgree || isFetching;

  const isSBPBtnDisabled = !values.formState.isValid || !isAgree;

  return (
    <FormProvider {...values}>
      <form onSubmit={values.handleSubmit(onSubmit)}>
        <Box sx={sx.form}>
          <Box sx={sx.block}>
            <Typography variant='h6' sx={sx.title}>
              {t('details')}
            </Typography>

            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <HFTextField name='firstName' label={t('firstName')} />
              </Grid>
              <Grid item xs={12} sm={6}>
                <HFTextField name='lastName' label={t('lastName')} />
              </Grid>
              <Grid item xs={12} sm={6}>
                <HFPhoneInput name='phone' label={t('phone')} />
              </Grid>
              <Grid item xs={12} sm={6}>
                <HFTextField name='email' label={t('email')} type='email' />
              </Grid>
            </Grid>
          </Box>

          <Box sx={sx.block}>
            <Typography variant='h6' sx={sx.title}>
              {t('address')}
            </Typography>

            <Grid container spacing={2}>
              {deliveryProfiles.length !== 0 && (
                <Grid item xs={12}>
                  <HFSelect
                    onChange={value => onSelectDeliveryProfile(+value)}
                    name='deliveryProfileId'
                    options={deliveryProfiles}
                    label={t('profileSelect')}
                  />
                </Grid>
              )}

              <Grid item xs={12} sm={6}>
                <HFSelect name='cityId' options={cities} label={t('city')} placeholder='Выберите город' />
              </Grid>

              {addressFields.map(field => (
                <Grid key={field} item xs={12} sm={6}>
                  <HFTextField name={field} label={t(field)} onChange={changeDeliveryProfile} />
                </Grid>
              ))}

              <Grid item xs={12}>
                <HFTextField sx={sx.textarea} multiline rows={3} name='comment' label={t('comment')} />
              </Grid>

              <Grid
                container
                item
                xs={12}
                // sx={{ display: 'flex', alignItems: 'center', marginTop: '10px' }}
                spacing={2}
              >
                <Grid item xs={6} sm={6}>
                  <HFTextField name='promoCode' label={t('promoCode')} disabled={isPromoCodeApplies} />
                </Grid>

                <Grid item xs={6} sm={6}>
                  <Button
                    sx={sx.btnPromo}
                    type='button'
                    color={!isSubmitError ? 'primary' : 'error'}
                    disabled={!values.getValues('promoCode')}
                    onClick={addPromoCode}
                  >
                    {isPromoCodeApplies ? <CircularProgress /> : 'Применить'}
                  </Button>
                </Grid>

                <Typography variant='body2' color='text.muted' sx={sx.descriptionPromo}>
                  При указанном промокоде реферальный код не учитывается
                </Typography>

                <Grid item xs={12}>
                  <Checkbox
                    sx={sx.agreement}
                    value={isAgree}
                    onChange={agree}
                    label={
                      <span style={sx.agreementLabel}>
                        Даю свое согласие с{' '}
                        <Link href={`/${Path.OFERTA}`} target='_blank'>
                          условиями обслуживания
                        </Link>
                        , а также с &nbsp;
                        <Link href={`/${Path.PRIVACY}`} target='_blank'>
                          политикой конфиденциальности и правилами хранения моих персональных данных
                        </Link>
                        .
                      </span>
                    }
                  />
                </Grid>
              </Grid>
            </Grid>

            <Button
              sx={sx.btn}
              type='submit'
              disabled={isSubmitBtnDisabled}
              color={!isSubmitError ? 'primary' : 'error'}
            >
              {!isSubmitError ? t('toPay') : t('orderError')}
            </Button>
            <Button
              sx={sx.sbpBtn}
              disabled={isSBPBtnDisabled}
              color='success'
              onClick={() => handleClickSBPButton(values.getValues())}
            >
              {isSBPFetching ? <CircularProgress size={24} color='secondary' /> : t('SBP')}
            </Button>
          </Box>
        </Box>
      </form>
    </FormProvider>
  );
}
