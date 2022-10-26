const onlyDigits = /^\d*$/g;

const onlyDigitsWithSign = /^\d(-?\d)*$/g; // TODO: удалить регулярку, если не используется

const cyrillic = /[а-яё]/gi;

const regexp = {
  onlyDigits,
  onlyDigitsWithSign,
  cyrillic,
};

export default regexp;
