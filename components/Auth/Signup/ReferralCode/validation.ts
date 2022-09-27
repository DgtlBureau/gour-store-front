import * as yup from 'yup';

export type Translator = (str: string) => string;

export const getSchema = (t: Translator) =>
  yup.object().shape({
    referralCode: yup.string(),
  });
