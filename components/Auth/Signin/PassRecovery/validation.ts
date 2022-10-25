import { Translator } from 'types/entities/Translator';

import regexp from 'constants/regex';
import * as yup from 'yup';

const passRegExp = /^(?=.*?[0-9]).{8,}$/;

export const getSchema = (t: Translator) =>
  yup.object().shape({
    email: yup
      .string()
      .required(t('emailEmpty'))
      .test('cyrillic letters', t('emailError'), value => !!value && !regexp.cyrillic.test(value)),
    password: yup.string().matches(passRegExp, t('passwordError')),
    passwordConfirm: yup.string().oneOf([yup.ref('password'), null], t('passwordsDoNotMatch')),
  });
