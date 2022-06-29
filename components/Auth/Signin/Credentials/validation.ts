import * as yup from 'yup';

export type Translator = (str: string) => string;

export const getSchema = (t: Translator) =>
  yup.object().shape({
    phone: yup.string().required(t('phoneEmpty')),
    password: yup.string().required(t('passwordError')),
  });
