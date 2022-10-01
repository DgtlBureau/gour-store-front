import { Translator } from 'utils/Translator';
import * as yup from 'yup';

const passRegExp = /^(?=.*?[0-9]).{8,}$/;

export const getSchema = (t: Translator) =>
  yup.object().shape({
    type: yup.string().oneOf(['physical', 'organization', 'procurementOrganizer']),
    code: yup.string().required(t('codeEmpty')),
    email: yup.string().email(t('emailError')).required(t('emailEmpty')),
    firstName: yup.string().required(t('firstNameRequired')),
    lastName: yup.string().required(t('lastNameRequired')),
    password: yup.string().matches(passRegExp, t('passwordError')),
    passwordConfirm: yup.string().oneOf([yup.ref('password'), null], t('passwordsDoNotMatch')),
  });
