import regexp from 'constants/regex';
import * as yup from 'yup';

import { Translator } from 'types/entities/Translator';

export const getSchema = (t: Translator) =>
  yup.object().shape({
    email: yup
      .string()
      .required(t('emailRequired'))
      .email(t('incorrectEmail'))
      .test('cyrillic letters', t('incorrectEmail'), value => !!value && !regexp.cyrillic.test(value)),
    code: yup.string().required(t('codeRequired')),
  });
