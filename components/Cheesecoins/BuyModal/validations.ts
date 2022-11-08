import * as yup from 'yup';

import { Translator } from 'types/entities/Translator';

import regexp from 'constants/regex';

export const getExpDate = (value?: string) => {
  const regexpResult = value?.match(/^(\d{2})\D*(\d{2})$/);
  if (!regexpResult) {
    return;
  }
  const [_, month, year] = regexpResult;
  // eslint-disable-next-line consistent-return
  return [month, year] as const;
};

export const getValidationSchema = (t: Translator) =>
  yup.object().shape({
    cardNumber: yup
      .string()
      .required(t('required'))
      .test('len', t('minCardNumber'), val => val?.replace(/\D/g, '').length === 16),

    cvv: yup
      .string()
      .required(t('required'))
      .test('len', t('cvvError'), val => String(val).length === 3)
      .test('int', t('cvvError'), val => Number.isInteger(Number(val)))
      .typeError(t('required')),

    expDate: yup
      .string()
      .required(t('required'))
      .test('valid', t('dateError'), value => {
        const date = getExpDate(value);
        if (!date) return false;
        const [month, _year] = date;
        return +month >= 1 && +month <= 12;
      }),

    email: yup
      .string()
      .email(t('emailError'))
      .test('emailError', t('incorrectEmail'), value => !value || !regexp.cyrillic.test(value))
      .test('required', t('required'), (value, context) => {
        if (context.parent.isSendInvoice) return !!value?.length;
        return true;
      }),
  });

const twoRegDigits = Array.from<RegExp>({ length: 2 }).fill(/\d/);
const fourRegDigits = Array.from<RegExp>({ length: 4 }).fill(/\d/);

export const formMasks = {
  cardNumber: [...fourRegDigits, ' ', ...fourRegDigits, ' ', ...fourRegDigits, ' ', ...fourRegDigits],
  expDate: [...twoRegDigits, ' ', '/', ' ', ...twoRegDigits],
};
