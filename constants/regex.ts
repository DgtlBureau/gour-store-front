const onlyDigits = /^\d*$/g;

const cyrillic = /[а-яё]/gi;

// "Must Contain 8 Characters, One Number and One english or cyrillic Character"
const password = /^(?=.*\D)(?=.*[a-zA-Z])(?=.*[0-9])(.{8,})$/;

const regexp = {
  onlyDigits,
  cyrillic,
  password,
};

export default regexp;
