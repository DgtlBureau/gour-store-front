import React from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import translations from './ReferralCode.i18n.json';
import { useLocalTranslation } from '../../../../hooks/useLocalTranslation';
import { getSchema, Translator } from './validation';
import { AuthCard } from '../../Card/Card';
import { Button } from '../../../UI/Button/Button';
import sx from './ReferralCode.styles';
import { ReferralCodeDto } from '../../../../@types/dto/referral-code.dto';
import { HFTextField } from '../../../HookForm/HFTextField';
import { Typography } from '../../../UI/Typography/Typography';

export type SignupReferralCodeProps = {
  defaultValues?: ReferralCodeDto;
  onBack(): void;
  onSubmit(data: ReferralCodeDto): void;
};

export function SignupReferralCode({
  defaultValues,
  onBack,
  onSubmit,
}: SignupReferralCodeProps) {
  const { t } = useLocalTranslation(translations);

  const schema = getSchema(t as Translator);

  const values = useForm<ReferralCodeDto>({
    defaultValues,
    mode: 'onBlur',
    resolver: yupResolver(schema),
  });

  const submit = (data: ReferralCodeDto) => onSubmit(data);

  return (
    <AuthCard>
      <Typography variant="h6">{t('firstText')}</Typography>
      <FormProvider {...values}>
        <form id="referralCodeForm" onSubmit={values.handleSubmit(submit)}>
          <Button
            sx={sx.backBtn}
            size="small"
            variant="outlined"
            onClick={onBack}
          >
            {t('goBack')}
          </Button>

          <HFTextField
            sx={sx.field}
            type="text"
            name="referralCode"
            label={t('referralCode')}
            helperText={t('referralCodeHelper')}
          />
        </form>
      </FormProvider>
      <Typography sx={{ margin: '0 0 10px 0' }} variant="h6">
        {t('secondText')}
      </Typography>

      <Button form="referralCodeForm" type="submit" sx={sx.submitBtn}>
        {t('goNext')}
      </Button>
    </AuthCard>
  );
}
