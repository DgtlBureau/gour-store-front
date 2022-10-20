import * as yup from 'yup';

import { Translator } from 'types/entities/Translator';

export const getValidationSchema = (t: Translator) =>
  yup.object().shape({
    count: yup
      .number()
      .min(1, t('minCount'))
      .integer(t('correctDecimal'))
      .typeError(t('countRequired'))
      .required(t('countRequired')),
  });
