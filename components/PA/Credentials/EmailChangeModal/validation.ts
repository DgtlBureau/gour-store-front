import * as yup from 'yup';

export type Translator = (str: string) => string;

export const getValidationSchema = (t: Translator) => {
  return yup.object().shape({
    email: yup.string().required(t('emailRequired')).email(t('incorrectEmail')),
  });
};
