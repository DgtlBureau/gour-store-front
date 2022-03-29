import React from 'react';
import { Paper } from '@mui/material';
import { useForm, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import schema from './validation';
import translations from './RegCitySelect.i18n.json';
import { useLocalTranslation } from "../../../hooks/useLocalTranslation";
import { Button } from '../../UI/Button/Button';
import { Typography } from '../../UI/Typography/Typography';
import { HFSelect } from '../../HookForm/HFSelect';

const sx = {
  paper: {
    display: 'flex',
    flexDirection: 'column',
    padding: '60px',
  },
  title: {
    fontWeight: 700,
    fontSize: '18px',
  },
  select: {
    margin: '16px 0',
  },
  backBtn: {
    width: 'fit-content',
    padding: '0 15px',
    marginBottom: '20px',
  },
};

type RegCityFields = {
  city: string;
};

export type RegCitySelectProps = {
  city: string;
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

  const values = useForm<RegCityFields>({
    defaultValues: { city },
    mode: 'onBlur',
    resolver: yupResolver(schema),
  });

  const submitHandler = (data: RegCityFields) => onSubmit(data.city);

  return (
    <FormProvider {...values}>
      <form onSubmit={values.handleSubmit(submitHandler)}>
        <Paper square elevation={0} sx={sx.paper}>
          <Button onClick={onBack} sx={sx.backBtn} variant="outlined">
            {t('back')}
          </Button>

          <Typography sx={sx.title}>
            {t('title')}
          </Typography>

          <HFSelect options={options} name="city" placeholder="Выбор города" sx={sx.select} />

          <Button type="submit">
            {t('continue')}
          </Button>
        </Paper>
      </form>
    </FormProvider>
  );
}
