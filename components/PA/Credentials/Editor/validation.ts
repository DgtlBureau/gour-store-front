import { Translator } from 'utils/Translator';
import * as yup from 'yup';

export const getValidationSchema = (t: Translator) => yup.object().shape({
    firstName: yup.string().required(t('firstNameRequired')),
    lastName: yup.string().required(t('lastNameRequired')),
  });
