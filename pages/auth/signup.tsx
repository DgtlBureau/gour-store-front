import React, { useState } from 'react';

import { useCheckCodeMutation, useSendEmailCodeMutation, useSignUpMutation } from 'store/api/authApi';
import { useGetCityListQuery } from 'store/api/cityApi';
import { useGetRoleListQuery } from 'store/api/roleApi';

import { AuthLayout } from 'layouts/Auth/Auth';

import { SignupCitySelect } from 'components/Auth/Signup/CitySelect/CitySelect';
import { SignupCredentials } from 'components/Auth/Signup/Credentials/Credentials';
import { FavoriteInfo, SignupFavoriteInfo } from 'components/Auth/Signup/FavoriteInfo/FavoriteInfo';
import { SignupGreeting } from 'components/Auth/Signup/Greeting/Greeting';
import { SignupLayout } from 'components/Auth/Signup/Layout/Layout';
import { SignupReferralCode } from 'components/Auth/Signup/ReferralCode/ReferralCode';
import { useAppNavigation } from 'components/Navigation';

import { ReferralCodeDto } from 'types/dto/referral-code.dto';
import { SignUpFormDto } from 'types/dto/signup-form.dto';
import { SignUpDto } from 'types/dto/signup.dto';
import { NotificationType } from 'types/entities/Notification';

import { dispatchNotification } from 'packages/EventBus';
import { getErrorMessage } from 'utils/errorUtil';

import cityImage from 'assets/images/signup/city.svg';
import credentialsImage from 'assets/images/signup/credentials.svg';
import favoritesImage from 'assets/images/signup/favorites.svg';
import greetingsImage from 'assets/images/signup/greetings.svg';
import referralImage from 'assets/images/signup/referral-codes.svg';
import { favoriteCountries, favoriteProducts } from 'constants/favorites';

type AuthStage = 'greeting' | 'citySelect' | 'credentials' | 'favoriteInfo' | 'referralCode';

export default function SignUp() {
  const { goToIntro, goToSignIn, language } = useAppNavigation();

  const { data: cities } = useGetCityListQuery();
  const { data: roles } = useGetRoleListQuery();

  const convertedCities = cities
    ? cities.map(city => ({
        label: city.name[language].toString(),
        value: city.id.toString(),
      }))
    : [];

  const [sendCode, { isLoading: codeIsSending }] = useSendEmailCodeMutation();
  const [signUp] = useSignUpMutation();
  const [checkCode] = useCheckCodeMutation();

  const [stage, setStage] = useState<AuthStage>('greeting');
  const [selectedCity, setSelectedCity] = useState<string | undefined>(undefined);
  const [credentials, setCredentials] = useState<SignUpFormDto | undefined>(undefined);
  const [_favoriteInfo, setFavoriteInfo] = useState({} as FavoriteInfo); // TODO сохранение выбора
  const [referralCode, setReferralCode] = useState('');

  const goToGreeting = () => setStage('greeting');
  const goToCitySelect = () => setStage('citySelect');
  const goToCredentials = () => setStage('credentials');
  const goToFavoriteInfo = () => setStage('favoriteInfo');
  const goToReferralCode = () => setStage('referralCode');

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

  const saveCity = (city: string) => {
    setSelectedCity(city);
    goToCredentials();
  };

  const saveCredentials = (data: SignUpFormDto) => {
    setCredentials(data);
    goToFavoriteInfo();
  };

  const saveFavoriteInfo = (info: FavoriteInfo) => {
    setFavoriteInfo(info);
    goToReferralCode();
  };

  const registerUser = async () => {
    if (!credentials || !selectedCity) return;

    const role = roles?.find(it => it.key === credentials.role);

    const data: SignUpDto = {
      firstName: credentials.firstName,
      lastName: credentials.lastName,
      email: credentials.email,
      code: credentials.code,
      password: credentials.password,
      referralCode,
      cityId: +selectedCity,
      roleId: role?.id || 1,
    };

    try {
      await signUp(data).unwrap();

      dispatchNotification('Регистрация прошла успешно');

      goToSignIn();
    } catch (error) {
      const message = getErrorMessage(error);

      dispatchNotification(message, { type: NotificationType.DANGER });
    }
  };

  const saveReferralCode = (referralData: ReferralCodeDto) => {
    setReferralCode(referralData.referralCode);
    registerUser();
  };

  const forms = {
    greeting: {
      component: <SignupGreeting onSubmit={goToCitySelect} onBack={goToIntro} />,
      image: greetingsImage,
      stepIndex: 1,
    },
    citySelect: {
      component: (
        <SignupCitySelect city={selectedCity} options={convertedCities} onSubmit={saveCity} onBack={goToGreeting} />
      ),
      image: cityImage,
      stepIndex: 2,
    },
    credentials: {
      component: (
        <SignupCredentials
          defaultValues={credentials}
          codeIsSending={codeIsSending}
          onEmailSend={sendEmail}
          onCodeCheck={checkEmailCode}
          onSubmit={saveCredentials}
          onBack={goToCitySelect}
        />
      ),
      image: credentialsImage,
      stepIndex: 3,
    },
    favoriteInfo: {
      component: (
        <SignupFavoriteInfo
          countries={favoriteCountries}
          products={favoriteProducts}
          onSubmit={saveFavoriteInfo}
          onBack={goToCredentials}
        />
      ),
      image: favoritesImage,
      stepIndex: 4,
    },
    referralCode: {
      component: <SignupReferralCode onSubmit={saveReferralCode} onBack={goToFavoriteInfo} />,
      image: referralImage,
      stepIndex: 5,
    },
  };

  return (
    <AuthLayout>
      <SignupLayout image={forms[stage].image} stepIndex={forms[stage].stepIndex}>
        {forms[stage].component}
      </SignupLayout>
    </AuthLayout>
  );
}
