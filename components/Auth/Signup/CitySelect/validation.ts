import * as yup from 'yup';

import { Translator } from 'types/entities/Translator';

export const getSchema = (t: Translator) =>
  yup.object().shape({
    city: yup.string().required(t('cityError')),
  });
