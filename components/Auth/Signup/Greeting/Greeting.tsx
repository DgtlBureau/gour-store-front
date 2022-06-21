import React from 'react';
import { Paper } from '@mui/material';

import translations from './Greeting.i18n.json';
import { useLocalTranslation } from '../../../../hooks/useLocalTranslation';
import { Box } from '../../../UI/Box/Box';
import { Typography } from '../../../UI/Typography/Typography';
import { Button } from '../../../UI/Button/Button';

const sx = {
  paper: {
    display: 'flex',
    flexDirection: 'column',
    width: '520px',
    padding: '60px',
    backgroundColor: 'background.default',
    border: '4px solid',
    borderColor: 'accent.main',
    borderRadius: '10px',
  },
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
    <Paper square elevation={0} sx={sx.paper}>
      <Button sx={sx.backBtn} size="small" variant="outlined" onClick={onBack}>
        {t('goBack')}
      </Button>

      <Box sx={sx.text}>
        <Typography variant="h6">{t('firstText')}</Typography>
        <Typography variant="h6">{t('secondText')}</Typography>
      </Box>

      <Button onClick={onSubmit}>{t('goNext')}</Button>
    </Paper>
  );
}
