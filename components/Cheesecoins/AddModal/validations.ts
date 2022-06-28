import * as yup from 'yup';
import { Translator } from '../../Auth/Signup/Credentials/validation';

export const getValidationSchema = (t: Translator) => {
  return yup.object().shape({
    count: yup
      .number()
      .min(1, t('minCount'))
      .typeError(t('countRequired'))
      .required(t('countRequired')),
  });
};
