import React from 'react';

import translations from './Greeting.i18n.json';
import { useLocalTranslation } from 'hooks/useLocalTranslation';
import { AuthCard } from 'components/Auth/Card/Card';
import { Box } from 'components/UI/Box/Box';
import { Typography } from 'components/UI/Typography/Typography';
import { Button } from 'components/UI/Button/Button';

const sx = {
  text: {
    margin: '20px 0',
  },
  backBtn: {
    width: 'fit-content',
  },
};

export type SignupGreetingProps = {
  onBack(): void;
  onSubmit(): void;
};

export function SignupGreeting({ onBack, onSubmit }: SignupGreetingProps) {
  const { t } = useLocalTranslation(translations);

  return (
    <AuthCard>
      <Button sx={sx.backBtn} size='small' variant='outlined' onClick={onBack}>
        {t('goBack')}
      </Button>

      <Box sx={sx.text}>
        <Typography variant='h6'>{t('firstText')}</Typography>
        <Typography variant='h6'>{t('secondText')}</Typography>
      </Box>

      <Button onClick={onSubmit}>{t('goNext')}</Button>
    </AuthCard>
  );
}
