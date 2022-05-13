import * as yup from 'yup';
import { Translator } from '../registration/RegCredentials/validation';

const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

export const getValidationSchema = (t: Translator) => {
  return yup.object().shape({
    firstName: yup.string().required(t('nameRequired')),
    lastName: yup.string().required(t('lastNameRequired')),
    phone: yup.string().required(t('phoneRequired')),
    // .matches(phoneRegExp, t('incorrectPhone')),
    email: yup.string().required(t('emailRequired')).email(t('incorrectEmail')),
    cityId: yup.number().required(t('cityRequired')),
    street: yup.string().required(t('streetRequired')),
    house: yup.string().required(t('houseRequired')),
  });
};
