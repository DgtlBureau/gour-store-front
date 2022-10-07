import React, { useState } from 'react';

import {
  useCheckCodeMutation,
  useRecoverPasswordMutation,
  useSendEmailCodeMutation,
  useSignInMutation,
} from 'store/api/authApi';

import { AuthLayout } from 'layouts/Auth/Auth';

import { SigninCredentials } from 'components/Auth/Signin/Credentials/Credentials';
import { SigninPassRecovery } from 'components/Auth/Signin/PassRecovery/PassRecovery';
import { useAppNavigation } from 'components/Navigation';

import { PasswordRecoveryDto } from 'types/dto/password-recovery.dto';
import { SignInDto } from 'types/dto/signin.dto';
import { NotificationType } from 'types/entities/Notification';

import { dispatchNotification } from 'packages/EventBus';
import { getErrorMessage } from 'utils/errorUtil';

type SignInStage = 'credentials' | 'recovery';

export default function SignIn() {
  const { goToIntro, goToSignUp, goToHome } = useAppNavigation();

  const [sendCode] = useSendEmailCodeMutation();
  const [checkCode, { isLoading: codeIsSending }] = useCheckCodeMutation();
  const [recoverPassword] = useRecoverPasswordMutation();
  const [signIn] = useSignInMutation();

  const [stage, setStage] = useState<SignInStage>('credentials');
  const [credentials, setCredentials] = useState({} as SignInDto);
  const [recoveryData, setRecoveryData] = useState({} as PasswordRecoveryDto);

  const goToCredentials = () => setStage('credentials');
  const goToRecovery = () => setStage('recovery');

  const sendEmail = async (email: string) => {
    try {
      await sendCode({ email }).unwrap();

      dispatchNotification('Email код отправлен');

      return Promise.resolve();
    } catch (error) {
      const message = getErrorMessage(error);

      return Promise.reject(message);
    }
  };

  const checkEmailCode = async (code: string) => {
    try {
      const isSuccess = await checkCode({ code }).unwrap();

      if (isSuccess) dispatchNotification('Код подтверждён');

      return isSuccess;
    } catch (error) {
      const message = getErrorMessage(error);

      return Promise.reject(message);
    }
  };

  const authorize = async (dto: SignInDto) => {
    setCredentials(dto);

    try {
      await signIn(dto).unwrap();

      dispatchNotification('Добро пожаловать :]');

      goToHome();
    } catch (error) {
      const message = getErrorMessage(error);

      dispatchNotification(message, { type: NotificationType.DANGER });

      setCredentials(prevState => ({ ...prevState, password: '' }));
    }
  };

  const recover = async (dto: PasswordRecoveryDto) => {
    setRecoveryData(dto);

    try {
      await recoverPassword(dto).unwrap();

      dispatchNotification('Пароль восстановлен');

      goToCredentials();
    } catch (error) {
      const message = getErrorMessage(error);

      dispatchNotification(message, { type: NotificationType.DANGER });
    }
  };

  const forms = {
    credentials: (
      <SigninCredentials
        defaultValues={credentials}
        onBack={goToIntro}
        onPasswordChange={goToRecovery}
        onRegister={goToSignUp}
        onSubmit={authorize}
      />
    ),
    recovery: (
      <SigninPassRecovery
        defaultValues={recoveryData}
        codeIsSending={codeIsSending}
        onEmailSend={sendEmail}
        onCodeCheck={checkEmailCode}
        onBack={goToCredentials}
        onSubmit={recover}
      />
    ),
  };

  return <AuthLayout>{forms[stage]}</AuthLayout>;
}
