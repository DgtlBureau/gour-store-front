import * as yup from 'yup';

// const phoneRegExp =
//   /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const passRegExp = /^(?=.*?[0-9]).{8,}$/;

export type Translator = (str: string) => string;

export const getSchema = (t: Translator) =>
  yup.object().shape({
    type: yup
      .string()
      .oneOf(['physical', 'organization', 'procurementOrganizer']),
    sms: yup.string().required(t('smsEmpty')),
    // phone: yup
    //   .string()
    //   .required(t('phoneEmpty'))
    //   .matches(phoneRegExp, t('phoneError')),
    password: yup.string().matches(passRegExp, t('passwordError')),
    passwordConfirm: yup
      .string()
      .oneOf([yup.ref('password'), null], t('passwordsDoNotMatch')),
  });
