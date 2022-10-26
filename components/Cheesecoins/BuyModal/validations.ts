import { Translator } from 'types/entities/Translator';

import regexp from 'constants/regex';
import * as yup from 'yup';

export const getExpDate = (value?: string) => {
  const regexpResult = value?.match(/^(\d{2})\D*(\d{2})$/);
  if (regexpResult) {
    const [, month, year] = regexpResult;
    return [+month, +year] as const;
  }
  return false;
};

export const getValidationSchema = (t: Translator) =>
  yup.object().shape({
    cardNumber: yup
      .string()
      .required(t('required'))
      .test('len', t('minCardNumber'), val => val?.replace(/\D/g, '').length === 16),

    cvv: yup
      .number()
      .required(t('required'))
      .test('len', t('cvvError'), val => String(val).length === 3 || String(val).length === 4)
      .integer(t('cvvError'))
      .typeError(t('required')),

    expDate: yup
      .string()
      .required(t('required'))
      .test('valid', t('dateError'), value => {
        const date = getExpDate(value);
        if (!date) return false;
        const [month, _year] = date;
        return month >= 1 && month <= 12;
      }),

    invoiceEmail: yup
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
