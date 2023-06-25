import React, { useState } from 'react';

import {
  useCheckCodeMutation,
  useSendEmailCodeMutation,
  useSignInMutation,
  useSignUpMutation,
} from 'store/api/authApi';
import { useGetCityListQuery } from 'store/api/cityApi';
import { useGetRoleListQuery } from 'store/api/roleApi';

import { AuthLayout } from 'layouts/Auth/Auth';

import { SignupCredentials } from 'components/Auth/Signup/Credentials/Credentials';
import { SignupLayout } from 'components/Auth/Signup/Layout/Layout';
import { useAppNavigation } from 'components/Navigation';

import { SignUpFormDto } from 'types/dto/signup-form.dto';
import { SignUpDto } from 'types/dto/signup.dto';
import { NotificationType } from 'types/entities/Notification';

import { dispatchNotification } from 'packages/EventBus';
import { getErrorMessage } from 'utils/errorUtil';

import {getWasOrderPostponed, setOrderPostponed} from '../../store/slices/orderSlice';
import {useAppDispatch, useAppSelector} from '../../hooks/store';

type AuthStage = 'credentials';

export default function SignUp() {
  const { goToIntro, goToHome, language , goToBasket } = useAppNavigation();

  const { cities } = useGetCityListQuery(undefined, {
    selectFromResult: ({ data, ...params }) => ({
      cities:
        data?.map(city => ({
          value: city.id.toString(),
          label: city.name[language],
        })) || [],
      ...params,
    }),
  });
  const { data: roles = [] } = useGetRoleListQuery();

  const [sendCode, { isLoading: codeIsSending }] = useSendEmailCodeMutation();
  const [signUp] = useSignUpMutation();
  const [signIn] = useSignInMutation();
  const [checkCode] = useCheckCodeMutation();

  const [stage, setStage] = useState<AuthStage>('credentials');

  // const [selectedCity, setSelectedCity] = useState<string | undefined>();
  // const goToCredentials = () => setStage('credentials');
  // const goToReferralCode = () => setStage('referralCode');

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

  const dispatch = useAppDispatch();
  const wasPostponed = useAppSelector(getWasOrderPostponed);
  const registerUser = async (credentials: SignUpFormDto) => {
    if (!credentials || !credentials.city) return;

    const role = roles?.find(it => it.key === credentials.role);

    const data: SignUpDto = {
      firstName: credentials.firstName,
      lastName: credentials.lastName,
      email: credentials.email,
      code: credentials.code,
      password: credentials.password,
      referralCode: credentials.referralCode,
      cityId: +credentials.city,
      roleId: role?.id || 1,
    };

    try {
      await signUp(data).unwrap();

      dispatchNotification('Регистрация прошла успешно');

      await signIn({
        password: credentials.password,
        email: credentials.email,
      }).unwrap();

      if (wasPostponed) {
        dispatch(setOrderPostponed(false));
        goToBasket();
      } else {
        goToHome();
      }
    } catch (error) {
      const message = getErrorMessage(error);

      dispatchNotification(message, { type: NotificationType.DANGER });
    }
  };

  const saveCredentials = (data: SignUpFormDto) => {
    registerUser(data);
  };

  const forms = {
    credentials: {
      component: (
        <SignupCredentials
          roles={roles}
          codeIsSending={codeIsSending}
          onEmailSend={sendEmail}
          onCodeCheck={checkEmailCode}
          onSubmit={saveCredentials}
          onBack={goToIntro}
          cityOptions={cities}
        />
      ),
      stepIndex: 1,
    },
    // referralCode: {
    //   component: <SignupReferralCode onSubmit={saveReferralCode} onBack={goToCredentials} />,
    //   image: referralImage,
    //   stepIndex: 2,
    // },
    // citySelect: {
    //   component: <SignupCitySelect city={selectedCity} options={cities} onSubmit={saveCity} onBack={goToIntro} />,
    //   image: cityImage,
    //   stepIndex: 1,
    // },
    // favoriteInfo: {
    //   component: (
    //     <SignupFavoriteInfo
    //       countries={favoriteCountries}
    //       products={favoriteProducts}
    //       onSubmit={saveFavoriteInfo}
    //       onBack={goToCredentials}
    //     />
    //   ),
    //   image: favoritesImage,
    //   stepIndex: 4,
    // },
  };

  return (
    <AuthLayout>
      <SignupLayout stepIndex={forms[stage].stepIndex}>
        {forms[stage].component}
      </SignupLayout>
    </AuthLayout>
  );
}
