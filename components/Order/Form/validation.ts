import * as yup from 'yup';
import { Translator } from '../../Auth/Signup/Credentials/validation';

export const getValidationSchema = (t: Translator) => {
  return yup.object().shape({
    firstName: yup.string().required(t('nameRequired')),
    lastName: yup.string().required(t('lastNameRequired')),
    phone: yup.string().required(t('phoneRequired')),
    email: yup.string().required(t('emailRequired')).email(t('incorrectEmail')),
    cityId: yup.number().required(t('cityRequired')),
    street: yup.string().required(t('streetRequired')),
    house: yup.string().required(t('houseRequired')),
  });
};
