const onlyDigits = /^\d*$/g;

const onlyDigitsWithSign = /^-?\d*$/g;

const cyrillic = /[а-яА-ЯёЁ]/gi;

const regexp = {
  onlyDigits,
  onlyDigitsWithSign,
  cyrillic,
};

export default regexp;
