import React from 'react';

import translations from './LkOrderProfileItem.i18n.json';
import { useLocalTranslation } from '../../../hooks/useLocalTranslation';
import { FormProvider, useForm } from 'react-hook-form';
import { Grid, Stack } from '@mui/material';
import { HFTextField } from '../../HookForm/HFTextField';
import { HFCheckbox } from '../../HookForm/HFCheckbox';
import { HFSelect } from '../../HookForm/HFSelect';
import { Button } from '../../UI/Button/Button';
import { yupResolver } from '@hookform/resolvers/yup';
import { getValidationSchema } from './validation';
import { Box } from '../../UI/Box/Box';

export type OrderProfile = {
  title: string;
  cityId: number;
  street: string;
  house: string;
  apartment: string;
  entrance: string;
  floor: string;
  comment?: string;
  isMain: boolean;
};

const addressFields = ['street', 'house', 'apartment', 'entrance', 'floor'];

type Props = {
  orderProfile: OrderProfile;
  cities: {
    value: number;
    label: string;
  }[];
  onSave(orderProfile: OrderProfile): void;
};

export const LkOrderProfileForm = ({ orderProfile, cities, onSave }: Props) => {
  const { t } = useLocalTranslation(translations);

  const schema = getValidationSchema(t);

  const values = useForm<OrderProfile>({
    defaultValues: orderProfile,
    mode: 'onBlur',
    resolver: yupResolver(schema),
  });

  const submitHandler = (orderProfileData: OrderProfile) => {
    onSave(orderProfileData);
  };

  const onCancel = () => {
    values.reset(orderProfile);
  };

  return (
    <FormProvider {...values}>
      <form onSubmit={values.handleSubmit(submitHandler)}>
        <Stack spacing={2}>
          <Grid container spacing={2}>
            <Grid item xs={6} container spacing={2}>
              <Grid item xs={6}>
                <HFSelect name="cityId" options={cities} placeholder="Город" />
              </Grid>
              {addressFields.map(field => (
                <Grid key={field} item xs={6}>
                  <HFTextField name={field} label={t(field)} />
                </Grid>
              ))}
            </Grid>
            <Grid item xs={6} container spacing={2}>
              <Grid item xs={12}>
                <HFTextField name="title" label={'Заголовок'} />
              </Grid>
              <Grid item xs={12}>
                <HFTextField name="comment" multiline label={'Комментарий'} />
              </Grid>
              <Grid item xs={12}>
                <HFCheckbox name="isMain" label={t('isMain')} />
              </Grid>
            </Grid>
          </Grid>
          <Box>
            <Button sx={{ margin: '0 10px 0 0' }} type="submit">
              {t('save')}
            </Button>
            <Button onClick={onCancel}>{t('cancel')}</Button>
          </Box>
        </Stack>
      </form>
    </FormProvider>
  );
};
