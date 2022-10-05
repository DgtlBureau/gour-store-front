import React from 'react';

import { AuthCard } from 'components/Auth/Card/Card';
import { Button } from 'components/UI/Button/Button';

import { useLocalTranslation } from 'hooks/useLocalTranslation';

import translations from './Intro.i18n.json';

export type SigninIntroProps = {
  onClickAuth(): void;
  onClickRegistration(): void;
};

export function SigninIntro({ onClickAuth, onClickRegistration }: SigninIntroProps) {
  const { t } = useLocalTranslation(translations);

  return (
    <AuthCard>
      <Button onClick={onClickAuth} sx={{ marginBottom: '20px' }} variant='outlined'>
        {t('auth')}
      </Button>
      <Button onClick={onClickRegistration} sx={{ width: '100%' }}>
        {t('reg')}
      </Button>
    </AuthCard>
  );
}
