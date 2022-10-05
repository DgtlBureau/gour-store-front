import { Translator } from 'utils/Translator';

import * as yup from 'yup';

export const getSchema = (t: Translator) =>
  yup.object().shape({
    email: yup.string().required(t('emailRequired')),
    code: yup.string().required(t('codeRequired')),
  });
