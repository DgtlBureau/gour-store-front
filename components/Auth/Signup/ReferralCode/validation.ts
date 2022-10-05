import * as yup from 'yup';

export type Translator = (str: string) => string;

export const getSchema = () =>
  yup.object().shape({
    referralCode: yup.string(),
  });
