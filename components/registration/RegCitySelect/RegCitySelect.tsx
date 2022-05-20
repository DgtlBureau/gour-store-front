import React from 'react';
import { Paper } from '@mui/material';
import { useForm, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { getSchema, Translator } from './validation';
import translations from './RegCitySelect.i18n.json';
import { useLocalTranslation } from "../../../hooks/useLocalTranslation";
import { Button } from '../../UI/Button/Button';
import { Typography } from '../../UI/Typography/Typography';
import { HFSelect } from '../../HookForm/HFSelect';

import sx from './RegCitySelect.styles';

type RegCityFields = {
  city: string;
};

export type RegCitySelectProps = {
  city?: string;
  options: {
    label: string;
    value: string;
  }[];
  onBack(): void;
  onSubmit(city: string): void;
};

export function RegCitySelect({
  city,
  options,
  onBack,
  onSubmit,
}: RegCitySelectProps) {
  const { t } = useLocalTranslation(translations);

  const schema = getSchema(t as Translator);

  const values = useForm<RegCityFields>({
    defaultValues: { city },
    mode: 'onBlur',
    resolver: yupResolver(schema),
  });

  const submit = (data: RegCityFields) => onSubmit(data.city);

  return (
    <FormProvider {...values}>
      <form onSubmit={values.handleSubmit(submit)}>
        <Paper square elevation={0} sx={sx.paper}>
          <Button onClick={onBack} sx={sx.backBtn} variant="outlined" size="small">
            {t('back')}
          </Button>

          <Typography sx={sx.title}>
            {t('title')}
          </Typography>

          <HFSelect options={options} name="city" placeholder={t('city')} sx={sx.select} />

          <Button type="submit">
            {t('continue')}
          </Button>
        </Paper>
      </form>
    </FormProvider>
  );
}
