import React, { useState } from 'react';

import { AuthLayout } from 'layouts/Auth/Auth';
import { useAppNavigation } from 'components/Navigation'
import { SigninCredentials } from '../../components/Auth/Signin/Credentials/Credentials';
import { SigninPassRecovery } from '../../components/Auth/Signin/PassRecovery/PassRecovery';
import {
  useSignInMutation,
  useSendCodeMutation,
  useSignOutMutation,
} from '../../store/api/authApi';
import { SignInDto } from '../../@types/dto/signin.dto';
import { PasswordRecoveryDto } from '../../@types/dto/password-recovery.dto';
import { eventBus, EventTypes } from 'packages/EventBus';
import { NotificationType } from '../../@types/entities/Notification';

type SignInStage = 'credentials' | 'recovery';

export default function SignIn() {
  const { goToIntro, goToSignUp, goToHome } = useAppNavigation();

  const [sendCode] = useSendCodeMutation();
  const [signIn] = useSignInMutation();

  const [stage, setStage] = useState<SignInStage>('credentials');
  const [credentials, setCredentials] = useState({} as SignInDto);
  const [recoveryData, setRecoveryData] = useState({} as PasswordRecoveryDto);

  const goToCredentials = () => setStage('credentials');
  const goToRecovery = () => setStage('recovery');

  // finish it later
  const sendSMS = (phone: string) => {
    sendCode(phone);
    return '1234';
  };

  const authorize = async (data: SignInDto) => {
    setCredentials(data);
    try {
      await signIn(data).unwrap();
      eventBus.emit(EventTypes.notification, {
        message: 'Добро пожаловать :]',
        type: NotificationType.SUCCESS,
      });
      goToHome();
    } catch (e: unknown) {
      eventBus.emit(EventTypes.notification, {
        message: 'Ошибка авторизации',
        type: NotificationType.DANGER,
      });
      setCredentials(prevState => ({ ...prevState, password: '' }));
    }
  };

  const recover = async (data: PasswordRecoveryDto) => {
    setRecoveryData(data);

    try {
      // await recoverPassword(recoveryData).unwrap();
      goToCredentials();
    } catch (e: unknown) {
      eventBus.emit(EventTypes.notification, {
        message: 'Ошибка восстановления пароля',
        type: NotificationType.DANGER,
      });
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
        onSendSMS={sendSMS}
        onBack={goToCredentials}
        onSubmit={recover}
      />
    ),
  };

  return <AuthLayout>{forms[stage]}</AuthLayout>;
}
