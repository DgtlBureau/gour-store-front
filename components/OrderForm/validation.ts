import * as yup from 'yup';

const phoneRegExp = (
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/
);

export default yup.object().shape({
  firstName: yup.string().required('Укажите имя'),
  phone: yup.string().required('Укажите номер телефона').matches(phoneRegExp, 'Некорректный номер телефона'),
  email: yup.string().required('Укажите электронную почту').email('Некорректный адрес электронной почты'),

  city: yup.string().required('Укажите город'),
  street: yup.string().required('Укажите улицу'),
  house: yup.string().required('Укажите номер дома'),
});
