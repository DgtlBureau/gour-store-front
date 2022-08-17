import { Translator } from 'utils/Translator';
import * as yup from 'yup';

export const getValidationSchema = (t: Translator) =>
  yup.object().shape({
    count: yup.number().min(1, t('minCount')).typeError(t('countRequired')).required(t('countRequired')),
  });
