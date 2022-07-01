import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

import { AuthLayout } from 'layouts/Auth/Auth';
import { SignupGreeting } from 'components/Auth/Signup/Greeting/Greeting';
import { SignupCitySelect } from 'components/Auth/Signup/CitySelect/CitySelect';
import { SignupCredentials } from 'components/Auth/Signup/Credentials/Credentials';
import {
  SignupFavoriteInfo,
  FavoriteInfo,
} from 'components/Auth/Signup/FavoriteInfo/FavoriteInfo';
import { useGetCityListQuery } from 'store/api/cityApi';
import { useGetRoleListQuery } from 'store/api/roleApi';
import { useSendCodeMutation, useSignUpMutation } from 'store/api/authApi';
import { ITranslatableString } from '../../@types/entities/ITranslatableString';
import { SignUpFormDto } from '../../@types/dto/signup-form.dto';
import { SignUpDto } from '../../@types/dto/signup.dto';
import { favoriteCountries, favoriteProducts } from '../../constants/favorites';
import { eventBus, EventTypes } from 'packages/EventBus';
import { NotificationType } from '../../@types/entities/Notification';

type AuthStage = 'greeting' | 'citySelect' | 'credentials' | 'favoriteInfo';

export default function SignUp() {
  const router = useRouter();

  const locale = (router.locale || 'ru') as keyof ITranslatableString;

  const { data: cities } = useGetCityListQuery();
  const { data: roles } = useGetRoleListQuery();

  const convertedCities = cities
    ? cities.map(city => ({
        label: city.name[locale].toString(),
        value: city.id.toString(),
      }))
    : [];

  const [sendCode] = useSendCodeMutation();
  const [signUp] = useSignUpMutation();

  const [stage, setStage] = useState<AuthStage>('greeting');
  const [selectedCity, setSelectedCity] = useState('');
  const [credentials, setCredentials] =
    useState<SignUpFormDto | undefined>(undefined);
  const [favoriteInfo, setFavoriteInfo] = useState({} as FavoriteInfo);

  const goToIntro = () => router.push('/auth');
  const goToGreeting = () => setStage('greeting');
  const goToCitySelect = () => setStage('citySelect');
  const goToCredentials = () => setStage('credentials');
  const goToFavoriteInfo = () => setStage('favoriteInfo');
  const goToSignIn = () => router.push('/auth/signin');

  // finish it later
  const sendSMS = (phone: string) => {
    sendCode(phone);
    return '1234';
  };

  const saveCity = (city: string) => {
    setSelectedCity(city);
    goToCredentials();
  };

  const saveCredentials = (data: SignUpFormDto) => setCredentials(data);

  const saveFavoriteInfo = (info: FavoriteInfo) => {
    setFavoriteInfo(info);
    goToSignIn();
  };

  const register = async () => {
    if (!credentials) return;

    const role = roles?.find(it => it.key === credentials.role);

    const data: SignUpDto = {
      name: '',
      phone: credentials.phone,
      code: +credentials.sms,
      password: credentials.password,
      referralCode: credentials.referral,
      cityId: +selectedCity,
      roleId: (role && role.id) || 1,
    };

    try {
      await signUp(data).unwrap();
      goToFavoriteInfo();
    } catch (e: unknown) {
      eventBus.emit(EventTypes.notification, {
        message: 'Ошибка авторизации',
        type: NotificationType.DANGER,
      });
    }
  };

  useEffect(() => {
    if (credentials) register();
  }, [credentials]);

  const forms = {
    greeting: <SignupGreeting onSubmit={goToCitySelect} onBack={goToIntro} />,
    citySelect: (
      <SignupCitySelect
        city={selectedCity}
        options={convertedCities}
        onSubmit={saveCity}
        onBack={goToGreeting}
      />
    ),
    credentials: (
      <SignupCredentials
        defaultValues={credentials}
        onSendSMS={sendSMS}
        onSubmit={saveCredentials}
        onBack={goToCitySelect}
      />
    ),
    favoriteInfo: (
      <SignupFavoriteInfo
        countries={favoriteCountries}
        products={favoriteProducts}
        onSubmit={saveFavoriteInfo}
        onBack={goToCredentials}
      />
    ),
  };

  return <AuthLayout>{forms[stage]}</AuthLayout>;
}
