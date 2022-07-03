import { Translator } from 'utils/Translator';
import * as yup from 'yup';

const passRegExp = /^(?=.*?[0-9]).{8,}$/;

export const getSchema = (t: Translator) =>
  yup.object().shape({
    prevPassword: yup.string().required('Введите старый пароль'),
    newPassword: yup.string().matches(passRegExp, t('passwordError')),
    repeatNewPassword: yup
      .string()
      .oneOf([yup.ref('newPassword'), null], t('passwordsDoNotMatch')),
  });
