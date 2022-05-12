import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

import { AuthLayout } from 'layouts/AuthLayout';
import { RegGreeting } from 'components/registration/RegGreeting/RegGreeting';
import { RegCitySelect } from 'components/registration/RegCitySelect/RegCitySelect';
import { RegCredentials } from 'components/registration/RegCredentials/RegCredentials';
import { RegFavoriteInfo, FavoriteInfo } from 'components/registration/RegFavoriteInfo/RegFavoriteInfo';
import { useGetCityListQuery } from 'store/api/cityApi';
import { useGetRoleListQuery } from 'store/api/roleApi';
import { useSendCodeMutation, useSignUpMutation } from 'store/api/authApi';
import { ITranslatableString } from '../../@types/entities/ITranslatableString';
import { SignUpDto } from '../../@types/dto/signup.dto';
import { RegistrationData } from '../../@types/entities/RegistrationData';
import { favoriteCountries, favoriteProducts } from '../../constants/favorites';

type AuthStage = 'greeting' | 'citySelect' | 'credentials' | 'favoriteInfo';

export default function SignUp() {
  const router = useRouter();

  const locale = (router.locale || 'ru') as keyof ITranslatableString;

  const { data: cities } = useGetCityListQuery();
  const { data: roles } = useGetRoleListQuery();

  const convertedCities = cities ? cities.map(city => (
    {
      label: city.name[locale].toString(),
      value: city.id.toString(),
    }
  )) : [];

  const [sendCode] = useSendCodeMutation();
  const [signUp] = useSignUpMutation();

  const [stage, setStage] = useState<AuthStage>('greeting');
  const [selectedCity, setSelectedCity] = useState('');
  const [credentials, setCredentials] = useState({} as SignUpDto);
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

  const saveCredentials = async (data: SignUpDto) => {
    setCredentials(data);
    register();
  };

  const saveFavoriteInfo = (info: FavoriteInfo) => {
    setFavoriteInfo(info);
    goToSignIn();
  };

  const register = async () => {
    const role = roles?.find(it => it.key === credentials.role)

    const data: RegistrationData = {
      name: '',
      phone: credentials.phone,
      code: +credentials.sms,
      password: credentials.password,
      referralCode: credentials.referral,
      cityId: +selectedCity,
      roleId: role && role.id || 1,
    };

    try {
      await signUp(data).unwrap();
      goToFavoriteInfo();
    } catch(e: unknown) {
      // event bus notification
    }
  };

  const forms = {
    greeting: (
      <RegGreeting
        onSubmit={goToCitySelect}
        onBack={goToIntro}
      />
    ),
    citySelect: (
      <RegCitySelect
        city={selectedCity}
        options={convertedCities}
        onSubmit={saveCity}
        onBack={goToGreeting}
      />
    ),
    credentials: (
      <RegCredentials
        defaultValues={credentials}
        onSendSMS={sendSMS}
        onSubmit={saveCredentials}
        onBack={goToCitySelect}
      />
    ),
    favoriteInfo: (
      <RegFavoriteInfo
        countries={favoriteCountries}
        products={favoriteProducts}
        onSubmit={saveFavoriteInfo}
        onBack={goToCredentials}
      />
    ),
  };

  return <AuthLayout>{forms[stage]}</AuthLayout>;
}
