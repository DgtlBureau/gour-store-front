import React from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useLocalTranslation } from 'hooks/useLocalTranslation';
import { ReferralCodeDto } from 'types/dto/referral-code.dto';
import translations from './ReferralCode.i18n.json';
import { getSchema } from './validation';
import { AuthCard } from 'components/Auth/Card/Card';
import { Button } from 'components/UI/Button/Button';
import sx from './ReferralCode.styles';
import { HFTextField } from 'components/HookForm/HFTextField';
import { Typography } from 'components/UI/Typography/Typography';

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
