import React from 'react';
import { useRouter } from 'next/router';

import { AuthLayout } from '../../layouts/AuthLayout';
import { RegIntro } from 'components/registration/RegIntro/RegIntro';

const sx = {
  auth: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
  },
};

export default function Auth() {
  const router = useRouter();

  const goToSignIn = () => router.push('/auth/signin');

  const goToSignUp = () => router.push('/auth/signup');

  return (
    <AuthLayout>
      <RegIntro onClickAuth={goToSignIn} onClickRegistration={goToSignUp} />
    </AuthLayout>
  );
}
