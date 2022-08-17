import React, { useState } from 'react';

import { AuthLayout } from 'layouts/Auth/Auth';
import { SignupGreeting } from 'components/Auth/Signup/Greeting/Greeting';
import { SignupCitySelect } from 'components/Auth/Signup/CitySelect/CitySelect';
import { SignupCredentials } from 'components/Auth/Signup/Credentials/Credentials';
import { SignupFavoriteInfo, FavoriteInfo } from 'components/Auth/Signup/FavoriteInfo/FavoriteInfo';
import { useGetCityListQuery } from 'store/api/cityApi';
import { useGetRoleListQuery } from 'store/api/roleApi';
import { useSendCodeMutation, useSignUpMutation } from 'store/api/authApi';
import { useAppNavigation } from 'components/Navigation';
import { SignupReferralCode } from 'components/Auth/Signup/ReferralCode/ReferralCode';
import { SignupLayout } from 'components/Auth/Signup/Layout/Layout';
import { dispatchNotification } from 'packages/EventBus';
import { SignUpFormDto } from '../../@types/dto/signup-form.dto';
import { SignUpDto } from '../../@types/dto/signup.dto';
import { favoriteCountries, favoriteProducts } from '../../constants/favorites';
import { ReferralCodeDto } from '../../@types/dto/referral-code.dto';

import credentialsImage from '../../assets/icons/signup/credentials.svg';
import greetingsImage from '../../assets/icons/signup/greetings.svg';
import cityImage from '../../assets/icons/signup/city.svg';
import favoritesImage from '../../assets/icons/signup/favorites.svg';
import referralImage from '../../assets/icons/signup/referralCodes.svg';

import { NotificationType } from '../../@types/entities/Notification';

type AuthStage = 'referralCode' | 'greeting' | 'citySelect' | 'credentials' | 'favoriteInfo';

export default function SignUp() {
  const { goToIntro, goToSignIn, language } = useAppNavigation();

  const { data: cities } = useGetCityListQuery();
  const { data: roles } = useGetRoleListQuery();

  const convertedCities = cities
    ? cities.map((city) => ({
        label: city.name[language].toString(),
        value: city.id.toString(),
      }))
    : [];

  const [sendCode] = useSendCodeMutation();
  const [signUp] = useSignUpMutation();

  const [stage, setStage] = useState<AuthStage>('favoriteInfo');
  const [selectedCity, setSelectedCity] = useState('');
  const [credentials, setCredentials] = useState<SignUpFormDto | undefined>(undefined);
  const [favoriteInfo, setFavoriteInfo] = useState({} as FavoriteInfo);
  const [referralCode, setReferralCode] = useState('');
  const [isPhoneCodeValid, setIsPhoneCodeValid] = useState(false);

  const goToGreeting = () => setStage('greeting');
  const goToCitySelect = () => setStage('citySelect');
  const goToCredentials = () => setStage('credentials');
  const goToFavoriteInfo = () => setStage('favoriteInfo');
  const goToReferralCode = () => setStage('referralCode');

  const sendSMS = async (phone: string) => {
    // TODO: затипизировать ошибку и выводить строку с ошибкой или success
    try {
      await sendCode(phone).unwrap();
      return 'success';
    } catch (error) {
      console.error(error);
      return (error as any).data.message;
    }
  };
  const checkCode = async (code: string) => {
    // TODO: затипизировать ошибку и выводить строку с ошибкой или success

    try {
      // запрос на проверку кода
      if (code !== '1234') throw new Error('Код не валиден');
      setIsPhoneCodeValid(true);
      return true;
    } catch (error) {
      console.error(error);
      return false;
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

    const role = roles?.find((it) => it.key === credentials.role);

    const data: SignUpDto = {
      firstName: credentials.firstName,
      lastName: credentials.lastName,
      phone: credentials.phone,
      code: +credentials.sms,
      password: credentials.password,
      referralCode,
      cityId: +selectedCity,
      roleId: (role && role.id) || 1,
    };

    try {
      await signUp(data).unwrap();
      goToFavoriteInfo();
    } catch (e: unknown) {
      dispatchNotification('Ошибка авторизации', { type: NotificationType.DANGER });
    }
  };

  const saveReferralCode = (referralData: ReferralCodeDto) => {
    setReferralCode(referralData.referralCode);
    registerUser();
    goToSignIn();
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
          onSendSMS={sendSMS}
          onCheckCode={checkCode}
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
