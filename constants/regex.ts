const onlyDigits = /^\d*$/g;

const onlyDigitsWithSign = /^-?\d*$/g;

const cyrillic = /[а-яё]/gi;

const password = /^(?=.*?[0-9]).{8,}$/;

const regexp = {
  onlyDigits,
  onlyDigitsWithSign,
  cyrillic,
  password,
};

export default regexp;
