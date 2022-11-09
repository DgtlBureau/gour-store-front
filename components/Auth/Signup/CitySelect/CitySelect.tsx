import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import { yupResolver } from '@hookform/resolvers/yup';

import { AuthCard } from 'components/Auth/Card/Card';
import { HFSelect } from 'components/HookForm/HFSelect';
import { Button } from 'components/UI/Button/Button';
import { Typography } from 'components/UI/Typography/Typography';

import { IOption } from 'types/entities/IOption';

import { useLocalTranslation } from 'hooks/useLocalTranslation';

import translations from './CitySelect.i18n.json';
import { getSchema } from './validation';

import sx from './CitySelect.styles';

type SignupCityFields = {
  city: string;
};

export type SignupCitySelectProps = {
  city?: string;
  options: IOption[];
  onBack(): void;
  onSubmit(cityId: string): void;
};

export function SignupCitySelect({ city, options, onBack, onSubmit }: SignupCitySelectProps) {
  const { t } = useLocalTranslation(translations);

  const schema = getSchema(t);

  const values = useForm<SignupCityFields>({
    defaultValues: { city: city || options[0]?.value },
    mode: 'onBlur',
    resolver: yupResolver(schema),
  });

  const submit = (data: SignupCityFields) => onSubmit(data.city);

  return (
    <AuthCard>
      <FormProvider {...values}>
        <form onSubmit={values.handleSubmit(submit)}>
          <Button onClick={onBack} sx={sx.backBtn} variant='outlined' size='small'>
            {t('back')}
          </Button>

          <Typography sx={sx.title}>{t('title')}</Typography>

          <HFSelect options={options} name='city' label={t('city')} sx={sx.select} />

          <Button type='submit' sx={sx.submitBtn}>
            {t('continue')}
          </Button>
        </form>
      </FormProvider>
    </AuthCard>
  );
}
