import * as yup from 'yup';

const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

export type Translator = (str: string) => string;

export const getSchema = (t: Translator) =>
  yup.object().shape({
    // phone: yup.string().required(t('phoneEmpty')).matches(phoneRegExp, t('phoneError')),
    password: yup.string().required(t('passwordError')),
  });
