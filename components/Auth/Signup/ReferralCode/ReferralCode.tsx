import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import { yupResolver } from '@hookform/resolvers/yup';

import { AuthCard } from 'components/Auth/Card/Card';
import { HFTextField } from 'components/HookForm/HFTextField';
import { Button } from 'components/UI/Button/Button';
import { Typography } from 'components/UI/Typography/Typography';

import { ReferralCodeDto } from 'types/dto/referral-code.dto';

import { useLocalTranslation } from 'hooks/useLocalTranslation';

import translations from './ReferralCode.i18n.json';
import sx from './ReferralCode.styles';
import { getSchema } from './validation';

export type SignupReferralCodeProps = {
  defaultValues?: ReferralCodeDto;
  onBack(): void;
  onSubmit(data: ReferralCodeDto): void;
};

export function SignupReferralCode({ defaultValues, onBack, onSubmit }: SignupReferralCodeProps) {
  const { t } = useLocalTranslation(translations);

  const schema = getSchema();

  const values = useForm<ReferralCodeDto>({
    defaultValues,
    mode: 'onBlur',
    resolver: yupResolver(schema),
  });

  const submit = (data: ReferralCodeDto) => onSubmit(data);

  return (
    <AuthCard>
      <Button sx={sx.backBtn} size='small' variant='outlined' onClick={onBack}>
        {t('goBack')}
      </Button>
      <Typography variant='h6'>{t('firstText')}</Typography>
      <Typography variant='h6'>{t('secondText')}</Typography>
      <FormProvider {...values}>
        <form id='referralCodeForm' onSubmit={values.handleSubmit(submit)}>
          <HFTextField
            sx={sx.field}
            type='text'
            name='referralCode'
            label={t('referralCode')}
            helperText={t('referralCodeHelper')}
          />
        </form>
      </FormProvider>
      <Typography variant='h6'>{t('thirdText')}</Typography>

      <Button form='referralCodeForm' type='submit' sx={sx.submitBtn}>
        {t('goNext')}
      </Button>
    </AuthCard>
  );
}
