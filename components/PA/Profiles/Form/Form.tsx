import React, { memo, useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import { yupResolver } from '@hookform/resolvers/yup';
import { Grid } from '@mui/material';

import { HFCheckbox } from 'components/HookForm/HFCheckbox';
import { HFSelect } from 'components/HookForm/HFSelect';
import { HFTextField } from 'components/HookForm/HFTextField';
import { Button } from 'components/UI/Button/Button';
import { IconButton } from 'components/UI/IconButton/IconButton';

import { OrderProfileDto } from 'types/dto/order/profile.dto';

import { useLocalTranslation } from 'hooks/useLocalTranslation';

import DeleteIcon from '@mui/icons-material/DeleteForeverOutlined';
import { color } from 'themes';

import translations from './Form.i18n.json';
import { getValidationSchema } from './validation';

const sx = {
  mainCheck: {
    display: 'flex',
    alignItems: 'center',
  },
  checkbox: {
    display: 'flex',
    alignItems: 'center',
  },
  actions: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  closeBtn: {
    margin: '0 6px 0 12px',
  },
};

const addressFields = ['street', 'house', 'apartment', 'entrance', 'floor'];

type PAProfilesFormProps = {
  defaultValues?: OrderProfileDto;
  cities: {
    value: number;
    label: string;
  }[];
  onSave(orderProfile: OrderProfileDto): void;
  onDelete(): void;
};

export const PAProfilesForm = memo(({ defaultValues, cities, onSave, onDelete }: PAProfilesFormProps) => {
  const { t } = useLocalTranslation(translations);

  const schema = getValidationSchema(t);

  const values = useForm<OrderProfileDto>({
    resolver: yupResolver(schema),
    mode: 'onBlur',
    defaultValues,
  });

  const submit = (data: OrderProfileDto) => onSave(data);

  const reset = () => values.reset(defaultValues);

  useEffect(() => reset(), [defaultValues]);

  return (
    <FormProvider {...values}>
      <form onSubmit={values.handleSubmit(submit)}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6} container spacing={2}>
            <Grid item xs={12} sm={6}>
              <HFSelect name='cityId' options={cities} label={t('city')} placeholder={t('cityPlaceholder')} />
            </Grid>
            {addressFields.map(field => (
              <Grid key={field} item xs={12} sm={6}>
                <HFTextField name={field} label={t(field)} />
              </Grid>
            ))}
          </Grid>

          <Grid item xs={12} md={6} container spacing={2}>
            <Grid item xs={12}>
              <HFTextField name='title' label={t('title')} />
            </Grid>

            <Grid item xs={12}>
              <HFTextField rows={4} multiline name='comment' label={t('comment')} />
            </Grid>
          </Grid>

          <Grid item xs={12} md={6} sx={sx.mainCheck}>
            <HFCheckbox name='isMain' label={t('isMain')} sx={sx.checkbox} />
          </Grid>

          <Grid item xs={12} md={6} container sx={sx.actions}>
            <Button type='submit' size='small'>
              {t('save')}
            </Button>
            <Button variant='outlined' size='small' onClick={reset} sx={sx.closeBtn}>
              {t('clear')}
            </Button>
            <IconButton>
              <DeleteIcon htmlColor={color.muted} onClick={onDelete} />
            </IconButton>
          </Grid>
        </Grid>
      </form>
    </FormProvider>
  );
});
