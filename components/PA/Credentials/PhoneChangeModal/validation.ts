import { Translator } from 'utils/Translator';
import * as yup from 'yup';

const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

export const getSchema = (t: Translator) =>
  yup.object().shape({
    phone: yup
      .string()
      .required(t('phoneEmpty'))
      .matches(phoneRegExp, t('phoneError')),
    sms: yup.string().required(t('smsEmpty')),
  });
