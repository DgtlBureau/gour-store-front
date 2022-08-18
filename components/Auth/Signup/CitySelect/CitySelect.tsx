import React from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { Translator } from 'utils/Translator';
import { Stepper } from 'components/UI/Stepper/Stepper';
import { Grid } from '@mui/material';
import Image from 'next/image';
import translations from './CitySelect.i18n.json';
import { useLocalTranslation } from 'hooks/useLocalTranslation';
import { getSchema } from './validation';
import { AuthCard } from 'components/Auth/Card/Card';
import { Button } from 'components/UI/Button/Button';
import { Typography } from 'components/UI/Typography/Typography';
import { HFSelect } from 'components/HookForm/HFSelect';

import cityImage from 'assets/icons/signup/city.svg';

import sx from './CitySelect.styles';
import { Box } from 'components/UI/Box/Box';

type SignupCityFields = {
  city: string;
};

export type SignupCitySelectProps = {
  city?: string;
  options: {
    label: string;
    value: string;
  }[];
  onBack(): void;
  onSubmit(cityId: string): void;
};

export function SignupCitySelect({ city, options, onBack, onSubmit }: SignupCitySelectProps) {
  const { t } = useLocalTranslation(translations);

  const schema = getSchema(t);

  const values = useForm<SignupCityFields>({
    defaultValues: { city },
    mode: 'onBlur',
    resolver: yupResolver(schema),
  });

  console.log(options);

  const submit = (data: SignupCityFields) => onSubmit(data.city);

  return (
    <AuthCard>
      <FormProvider {...values}>
        <form onSubmit={values.handleSubmit(submit)}>
          <Button onClick={onBack} sx={sx.backBtn} variant='outlined' size='small'>
            {t('back')}
          </Button>

          <Typography sx={sx.title}>{t('title')}</Typography>

          <HFSelect options={options} name='city' placeholder={t('city')} sx={sx.select} />

          <Button type='submit' sx={sx.submitBtn}>
            {t('continue')}
          </Button>
        </form>
      </FormProvider>
    </AuthCard>
  );
}
