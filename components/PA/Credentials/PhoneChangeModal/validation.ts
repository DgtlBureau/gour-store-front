import { Translator } from 'types/entities/Translator';

import * as yup from 'yup';

export const getSchema = (t: Translator) =>
  yup.object().shape({
    phone: yup.string().required(t('phoneEmpty')),
  });
