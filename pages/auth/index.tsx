import React from 'react';
import { useRouter } from 'next/router';

import { AuthLayout } from '../../layouts/Auth/Auth';
import { SigninIntro } from 'components/Auth/Signin/Intro/Intro';
import { eventBus, EventTypes } from 'packages/EventBus';
import { NotificationType } from '../../@types/entities/Notification';

export default function Auth() {
  const router = useRouter();

  const goToSignIn = () => router.push('/auth/signin');

  const goToSignUp = () => router.push('/auth/signup');

  return (
    <AuthLayout>
      <SigninIntro onClickAuth={goToSignIn} onClickRegistration={goToSignUp} />
    </AuthLayout>
  );
}
