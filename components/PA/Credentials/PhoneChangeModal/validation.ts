import { Translator } from 'utils/Translator';
import * as yup from 'yup';

export const getSchema = (t: Translator) =>
  yup.object().shape({
    phone: yup.string().required(t('phoneEmpty')),
    sms: yup.string().required(t('smsEmpty')),
  });
