import { Translator } from 'utils/Translator';
import * as yup from 'yup';

export const getSchema = (t: Translator) =>
  yup.object().shape({
    phone: yup.string().email(t('phoneError')).required(t('phoneEmpty')),
    password: yup.string().required(t('passwordError')),
  });
