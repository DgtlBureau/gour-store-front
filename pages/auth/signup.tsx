import React, { useEffect, useState } from 'react';

import { AuthLayout } from 'layouts/Auth/Auth';
import { useGetCityListQuery } from 'store/api/cityApi';
import { useGetRoleListQuery } from 'store/api/roleApi';
import { useCheckCodeMutation, useSendEmailCodeMutation, useSignUpMutation } from 'store/api/authApi';
import { SignUpFormDto } from 'types/dto/signup-form.dto';
import { ReferralCodeDto } from 'types/dto/referral-code.dto';
import { SignUpDto } from 'types/dto/signup.dto';
import { NotificationType } from 'types/entities/Notification';
import { favoriteCountries, favoriteProducts } from 'constants/favorites';
import { dispatchNotification } from 'packages/EventBus';

import { SignupGreeting } from 'components/Auth/Signup/Greeting/Greeting';
import { SignupCitySelect } from 'components/Auth/Signup/CitySelect/CitySelect';
import { SignupCredentials } from 'components/Auth/Signup/Credentials/Credentials';
import { SignupFavoriteInfo, FavoriteInfo } from 'components/Auth/Signup/FavoriteInfo/FavoriteInfo';
import { useAppNavigation } from 'components/Navigation';
import { SignupReferralCode } from 'components/Auth/Signup/ReferralCode/ReferralCode';
import { SignupLayout } from 'components/Auth/Signup/Layout/Layout';

import credentialsImage from 'assets/icons/signup/credentials.svg';
import greetingsImage from 'assets/icons/signup/greetings.svg';
import cityImage from 'assets/icons/signup/city.svg';
import favoritesImage from 'assets/icons/signup/favorites.svg';
import referralImage from 'assets/icons/signup/referralCodes.svg';
import { getErrorMessage } from 'utils/errorUtil';

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
  const [selectedCity, setSelectedCity] = useState('');
  const [credentials, setCredentials] = useState<SignUpFormDto | undefined>(undefined);
  const [favoriteInfo, setFavoriteInfo] = useState({} as FavoriteInfo);
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
      await checkCode({ code }).unwrap();

      dispatchNotification('Код подтверждён');

      return Promise.resolve();
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
    if (!credentials) return;

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
