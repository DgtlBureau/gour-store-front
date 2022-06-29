import { Translator } from 'utils/Translator';
import * as yup from 'yup';

export const getValidationSchema = (t: Translator) => {
  return yup.object().shape({
    email: yup.string().required(t('emailRequired')).email(t('incorrectEmail')),
  });
};
