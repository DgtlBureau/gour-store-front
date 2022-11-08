const onlyDigits = /^\d*$/g;

const onlyDigitsWithSign = /^\d(-?\d)*$/g; // TODO: удалить регулярку, если не используется

const cyrillic = /[а-яё]/gi;

const password = /^(?=.*?[0-9]).{8,}$/;

const regexp = {
  onlyDigits,
  onlyDigitsWithSign,
  cyrillic,
  password,
};

export default regexp;
