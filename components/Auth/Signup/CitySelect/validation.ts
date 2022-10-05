import { Translator } from 'types/entities/Translator';

import * as yup from 'yup';

export const getSchema = (t: Translator) =>
  yup.object().shape({
    city: yup.string().required(t('cityError')),
  });
