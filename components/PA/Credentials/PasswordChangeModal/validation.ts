import * as yup from 'yup';

import { Translator } from 'types/entities/Translator';

import regexp from 'constants/regex';

export const getSchema = (t: Translator) =>
  yup.object().shape({
    prevPassword: yup.string().required('Введите старый пароль'),
    newPassword: yup.string().matches(regexp.password, t('passwordError')),
    repeatNewPassword: yup.string().oneOf([yup.ref('newPassword'), null], t('passwordsDoNotMatch')),
  });
