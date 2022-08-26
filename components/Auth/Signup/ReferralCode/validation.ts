import * as yup from 'yup';

const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\(\d{2,3}\\)[ \\-]*)|(\d{2,4})[ \\-]*)*?\d{3,4}?[ \\-]*\d{3,4}?$/;

const passRegExp = /^(?=.*?\d).{8,}$/;

export type Translator = (str: string) => string;

export const getSchema = (t: Translator) =>
  yup.object().shape({
    referralCode: yup.string(),
  });
