import * as yup from 'yup';

import { Translator } from 'types/entities/Translator';

export const getValidationSchema = (t: Translator) =>
  yup.object().shape({
    firstName: yup.string().when('shouldRegister',{
        is: true,
        then: yup.string().required(t('nameRequired'))
    }),
    lastName: yup.string().when('shouldRegister',{
        is: true,
        then: yup.string().required(t('lastNameRequired'))
    }),

    phone: yup.string().required(t('phoneRequired')),
    email: yup.string().email(t('incorrectEmail')).when('shouldRegister',{
        is: true,
        then: yup.string().required(t('emailRequired'))
    }),

    cityId: yup.string().when('shouldRegister',{
        is: true,
        then: yup.string().required(t('cityRequired'))
    }),

    street: yup.string().when('shouldRegister',{
        is: true,
        then: yup.string().required(t('street'))
    }),

    house: yup.string().when('shouldRegister',{
        is: true,
        then: yup.string().required(t('house'))
    }),
    shouldRegister: yup.boolean(),
  })
;
