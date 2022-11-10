const onlyDigits = /^\d*$/g;

const cyrillic = /[а-яё]/gi;

const password = /^(?=.*?[0-9]).{8,}$/;

const regexp = {
  onlyDigits,
  cyrillic,
  password,
};

export default regexp;
