import React from 'react';
import { Paper } from '@mui/material';

import translations from './RegIntro.i18n.json';
import  { useLocalTranslation } from "../../../hooks/useLocalTranslation";
import { Button } from '../../UI/Button/Button';

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
  authBtn: {
    marginBottom: '20px',
  },
};

export type RegIntroProps = {
  onClickAuth(): void;
  onClickRegistration(): void;
};

export function RegIntro({
  onClickAuth,
  onClickRegistration,
}: RegIntroProps) {
  const { t } = useLocalTranslation(translations);

  return (
    <Paper square elevation={0} sx={sx.paper}>
      <Button onClick={onClickAuth} sx={sx.authBtn} variant="outlined">
        {t('auth')}
      </Button>
      <Button onClick={onClickRegistration}>
        {t('reg')}
      </Button>
    </Paper>
  );
}
