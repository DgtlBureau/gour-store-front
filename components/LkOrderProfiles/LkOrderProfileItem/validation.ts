import * as yup from 'yup';
import { Translator } from '../../registration/RegCredentials/validation';

export const getValidationSchema = (t: Translator) => {
  return yup.object().shape({
    title: yup.string().required(t('titleRequired')),
    cityId: yup.number().min(1, t('cityRequired')).required(t('cityRequired')),
    street: yup.string().required(t('streetRequired')),
    house: yup.string().required(t('houseRequired')),
  });
};
