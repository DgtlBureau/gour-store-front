import React from 'react';

import translations from './Greeting.i18n.json';
import { useLocalTranslation } from '../../../../hooks/useLocalTranslation';
import { AuthCard } from '../../Card/Card';
import { Box } from '../../../UI/Box/Box';
import { Typography } from '../../../UI/Typography/Typography';
import { Button } from '../../../UI/Button/Button';
import { Stepper } from 'components/UI/Stepper/Stepper';
import { Grid } from '@mui/material';
import Image from 'next/image';
import greetingImage from './../../../../assets/icons/signup/greeetings.svg';

const sx = {
  text: {
    margin: '20px 0',
  },
  backBtn: {
    width: 'fit-content',
  },
  stepper: {
    width: '100%',
    margin: '0 0 20px 0',
  },
  imageContainer: {
    position: {
      xs: 'absolute',
      md: 'relative',
    },
    left: '0',
    bottom: '0',
    transform: {
      xs: 'translateY(calc(100% - 25px))',
      md: 'translateY(0)',
    },
  },
};

export type SignupGreetingProps = {
  onBack(): void;
  onSubmit(): void;
};

export function SignupGreeting({ onBack, onSubmit }: SignupGreetingProps) {
  const { t } = useLocalTranslation(translations);

  return (
    <Grid
      container
      sx={{ position: 'relative' }}
      flexDirection={{ xs: 'column-reverse', md: 'row' }}
      alignItems="center"
      spacing={0}
    >
      <Grid sx={sx.imageContainer} item xs={4} md={6}>
        <Image
          src={greetingImage}
          layout="intrinsic"
          width={500}
          height={750}
        />
      </Grid>
      <Grid
        item
        sx={{
          width: '100%',
          maxWidth: {
            xs: 'unset',
            md: '500px',
          },
        }}
        xs={12}
        md={6}
      >
        <Box sx={sx.stepper}>
          <Stepper activeStep={0} stepsCount={5} percent={100} />
        </Box>
        <AuthCard>
          <Button
            sx={sx.backBtn}
            size="small"
            variant="outlined"
            onClick={onBack}
          >
            {t('goBack')}
          </Button>

          <Box sx={sx.text}>
            <Typography variant="h6">{t('firstText')}</Typography>
            <Typography variant="h6">{t('secondText')}</Typography>
          </Box>

          <Button onClick={onSubmit}>{t('goNext')}</Button>
        </AuthCard>
      </Grid>
    </Grid>
  );
}
