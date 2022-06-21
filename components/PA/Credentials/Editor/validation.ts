import * as yup from 'yup';

export type Translator = (str: string) => string;

export const getValidationSchema = (t: Translator) => {
  return yup.object().shape({
    firstName: yup.string().required(t('firstNameRequired')),
    lastName: yup.string().required(t('lastNameRequired')),
    referralCode: yup.string().required(t('referralCodeRequired')),
  });
};
