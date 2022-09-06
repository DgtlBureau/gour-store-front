import * as yup from 'yup';

export type Translator = (str: string) => string;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getSchema = (t: Translator) =>
  yup.object().shape({
    referralCode: yup.string(),
  });
