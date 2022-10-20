import { Translator } from 'types/entities/Translator';

import regexp from 'constants/regex';
import * as yup from 'yup';

export const getSchema = (t: Translator) =>
  yup.object().shape({
    email: yup
      .string()
      .email(t('emailError'))
      .required(t('emailEmpty'))
      .test('cyrillic letters', t('emailError'), value => !!value && !regexp.cyrillic.test(value)),
    password: yup.string().required(t('passwordError')),
  });
