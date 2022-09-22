import React, { useState } from 'react';

import {
  useSignInMutation,
  useSendCodeMutation,
  useCheckCodeMutation,
  useRecoverPasswordMutation,
} from 'store/api/authApi';
import { AuthLayout } from 'layouts/Auth/Auth';
import { useAppNavigation } from 'components/Navigation';
import { dispatchNotification } from 'packages/EventBus';
import { SigninCredentials } from 'components/Auth/Signin/Credentials/Credentials';
import { SigninPassRecovery } from 'components/Auth/Signin/PassRecovery/PassRecovery';
import { SignInDto } from 'types/dto/signin.dto';
import { PasswordRecoveryDto } from 'types/dto/password-recovery.dto';
import { NotificationType } from 'types/entities/Notification';
import { getErrorMessage } from 'utils/errorUtil';

type SignInStage = 'credentials' | 'recovery';

export default function SignIn() {
  const { goToIntro, goToSignUp } = useAppNavigation();

  const [sendCode] = useSendCodeMutation();
  const [signIn] = useSignInMutation();
  const [fetchCheckCode] = useCheckCodeMutation();
  const [fetchRecoverPassword] = useRecoverPasswordMutation();

  const [stage, setStage] = useState<SignInStage>('credentials');
  const [credentials, setCredentials] = useState({} as SignInDto);
  const [recoveryData, setRecoveryData] = useState({} as PasswordRecoveryDto);

  const goToCredentials = () => setStage('credentials');
  const goToRecovery = () => setStage('recovery');

  const sendSMS = async (phone: string) => {
    try {
      await sendCode(phone).unwrap();

      dispatchNotification('SMS код отправлен');

      return 'success';
    } catch (error) {
      const message = getErrorMessage(error);

      dispatchNotification(message, { type: NotificationType.DANGER });

      return 'failed';
    }
  };

  const checkCode = async (code: string) => {
    try {
      const isApprove = await fetchCheckCode(code).unwrap();

      if (!isApprove) dispatchNotification('Неверный код', { type: NotificationType.DANGER });

      return isApprove;
    } catch (error) {
      const message = getErrorMessage(error);

      dispatchNotification(message, { type: NotificationType.DANGER });

      return false;
    }
  };

  const authorize = async (data: SignInDto) => {
    setCredentials(data);

    try {
      await signIn(data).unwrap();

      dispatchNotification('Добро пожаловать');
    } catch (error) {
      const message = getErrorMessage(error);

      dispatchNotification(message, { type: NotificationType.DANGER });

      setCredentials(prevState => ({ ...prevState, password: '' }));
    }
  };

  const recoverPassword = async (data: PasswordRecoveryDto) => {
    setRecoveryData(data);

    try {
      await fetchRecoverPassword(recoveryData).unwrap();

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
        onCheckCode={checkCode}
        onSendSMS={sendSMS}
        onBack={goToCredentials}
        onSubmit={recoverPassword}
      />
    ),
  };

  return <AuthLayout>{forms[stage]}</AuthLayout>;
}
