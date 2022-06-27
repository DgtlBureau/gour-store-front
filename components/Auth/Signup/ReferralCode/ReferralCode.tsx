import React from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import translations from './ReferralCode.i18n.json';
import { useLocalTranslation } from '../../../../hooks/useLocalTranslation';
import { getSchema, Translator } from './validation';
import { AuthCard } from '../../Card/Card';
import { Box } from '../../../UI/Box/Box';
import { Button } from '../../../UI/Button/Button';

import sx from './ReferralCode.styles';

import { Stepper } from '../../../UI/Stepper/Stepper';
import { ReferralCodeDto } from '../../../../@types/dto/referral-code.dto';
import { HFTextField } from '../../../HookForm/HFTextField';
import { Typography } from '../../../UI/Typography/Typography';
import { Grid } from '@mui/material';
import Image from 'next/image';

import referralImage from './../../../../assets/icons/signup/referralCodes.svg';

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
    <Grid
      container
      sx={{ position: 'relative' }}
      flexDirection={{ xs: 'column-reverse', md: 'row' }}
      alignItems="center"
    >
      <Grid item xs={4} md={6}>
        <Image
          src={referralImage}
          layout="intrinsic"
          width={500}
          height={750}
        />
      </Grid>
      <Grid
        item
        xs={12}
        md={6}
        sx={{
          width: '100%',
          maxWidth: {
            xs: 'unset',
            md: '500px',
          },
        }}
      >
        <Box sx={sx.stepper}>
          <Stepper activeStep={5} stepsCount={5} percent={100} />
        </Box>
        <Typography variant="h6">{t('firstText')}</Typography>
        <AuthCard>
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
        </AuthCard>
        <Typography sx={{ margin: '0 0 10px 0' }} variant="h6">
          {t('secondText')}
        </Typography>

        <Button form="referralCodeForm" type="submit" sx={sx.submitBtn}>
          {t('goNext')}
        </Button>
      </Grid>
    </Grid>
  );
}
