import { Translator } from 'types/entities/Translator';

import * as yup from 'yup';

export const getSchema = (t: Translator) =>
  yup.object().shape({
    email: yup.string().email(t('phoneError')).required(t('phoneEmpty')),
    password: yup.string().required(t('passwordError')),
  });
