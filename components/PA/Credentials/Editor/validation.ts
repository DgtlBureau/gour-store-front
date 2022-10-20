import * as yup from 'yup';

import { Translator } from 'types/entities/Translator';

export const getValidationSchema = (t: Translator) =>
  yup.object().shape({
    firstName: yup.string().required(t('firstNameRequired')),
    lastName: yup.string().required(t('lastNameRequired')),
  });
