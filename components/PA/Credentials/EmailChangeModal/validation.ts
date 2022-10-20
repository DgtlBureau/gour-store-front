import * as yup from 'yup';

import { Translator } from 'types/entities/Translator';

export const getSchema = (t: Translator) =>
  yup.object().shape({
    email: yup.string().required(t('emailRequired')),
    code: yup.string().required(t('codeRequired')),
  });
