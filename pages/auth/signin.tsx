import React, { useState } from 'react';
import { useRouter } from 'next/router';

import { AuthLayout } from 'layouts/AuthLayout';
import { LoginCredentials } from '../../components/login/LoginCredentials/LoginCredentials';
import { LoginPassRecovery } from '../../components/login/LoginPassRecovery/LoginPassRecovery';
import { useSignInMutation, useSendCodeMutation } from '../../store/api/authApi';
import { SignInDto } from '../../@types/dto/signin.dto';
import { PasswordRecoveryDto } from '../../@types/dto/password-recovery.dto';

type SignInStage = 'credentials' | 'recovery';

export default function SignIn() {
  const router = useRouter();

  const [sendCode] = useSendCodeMutation();
  const [signIn] = useSignInMutation();

  const [stage, setStage] = useState<SignInStage>('credentials');
  const [credentials, setCredentials] = useState({} as SignInDto);
  const [recoveryData, setRecoveryData] = useState({} as PasswordRecoveryDto)

  const goToIntro = () => router.push('/auth');
  const goToCredentials = () => setStage('credentials');
  const goToRecovery = () => setStage('recovery');
  const goToRegistration = () => router.push('/auth/signup');
  const goToHome = () => router.push('/');

   // finish it later 
  const sendSMS = (phone: string) => {
    sendCode(phone);
    return '1234';
  };

  const authorize = async (data: SignInDto) => {
    setCredentials(data);

    try {
      await signIn(credentials).unwrap();
      goToHome();
    } catch(e: unknown) {
      // event bus notification
    }
  };

  const recover = async (data: PasswordRecoveryDto) => {
    setRecoveryData(data);

    try {
      // await recoverPassword(recoveryData).unwrap();
      goToCredentials();
    } catch(e: unknown) {
      // event bus notification
    }
  };

  const forms = {
    credentials: (
      <LoginCredentials
        defaultValues={credentials}
        onBack={goToIntro}
        onPasswordChange={goToRecovery}
        onRegister={goToRegistration}
        onSubmit={authorize}
      />
    ),
    recovery: (
      <LoginPassRecovery
        defaultValues={recoveryData}
        onSendSMS={sendSMS}
        onBack={goToCredentials}
        onSubmit={recover}
      />
    ),
  };

  return <AuthLayout>{forms[stage]}</AuthLayout>;
}
