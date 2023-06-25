import * as yup from 'yup';

import { Translator } from 'types/entities/Translator';

import regexp from 'constants/regex';

export const getSchema = (t: Translator) =>
  yup.object().shape({
    type: yup.string(),
    code: yup.string().required(t('codeEmpty')),
    email: yup
      .string()
      .required(t('emailEmpty'))
      .email(t('emailError'))
      .test('cyrillic letters', t('emailError'), value => !!value && !regexp.cyrillic.test(value)),
    firstName: yup.string().required(t('firstNameRequired')),
    lastName: yup.string().required(t('lastNameRequired')),
    password: yup.string().matches(regexp.password, t('passwordError')),
    passwordConfirm: yup.string().oneOf([yup.ref('password'), null], t('passwordsDoNotMatch')),
    city: yup.string().required(t('cityError')),
    referralCode: yup.string(),
  });
