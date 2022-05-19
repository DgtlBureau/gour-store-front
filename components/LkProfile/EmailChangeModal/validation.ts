import * as yup from 'yup';
import { Translator } from '../../../components/registration/RegCredentials/validation';

export const getValidationSchema = (t: Translator) => {
  return yup.object().shape({
    email: yup.string().required(t('emailRequired')).email(t('incorrectEmail')),
  });
};
