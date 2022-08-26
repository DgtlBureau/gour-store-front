import { Translator } from 'utils/Translator';
import * as yup from 'yup';

const passRegExp = /^(?=.*?\d).{8,}$/;

export const getSchema = (t: Translator) =>
  yup.object().shape({
    type: yup.string().oneOf(['physical', 'organization', 'procurementOrganizer']),
    sms: yup.string().required(t('smsEmpty')),
    phone: yup.string().required(t('phoneEmpty')),
    firstName: yup.string().required(t('firstNameRequired')),
    lastName: yup.string().required(t('lastNameRequired')),
    password: yup.string().matches(passRegExp, t('passwordError')),
    passwordConfirm: yup.string().oneOf([yup.ref('password'), null], t('passwordsDoNotMatch')),
  });
