import * as yup from 'yup';

export default yup.object().shape({
  city: yup.string().required('Выберите город'),
});