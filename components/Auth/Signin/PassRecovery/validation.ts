import { Translator } from 'utils/Translator';
import * as yup from 'yup';

const passRegExp = /^(?=.*?\d).{8,}$/;

export const getSchema = (t: Translator) =>
  yup.object().shape({
    phone: yup.string().required(t('phoneEmpty')),
    password: yup.string().matches(passRegExp, t('passwordError')),
    passwordConfirm: yup.string().oneOf([yup.ref('password'), null], t('passwordsDoNotMatch')),
  });
