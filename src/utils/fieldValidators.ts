export type Validator = (str: string) => { isValid: boolean; helper: string };

export const loginValidator: Validator = (str: string) => {
  const result = { isValid: true, helper: '' };

  const unacceptableSymbols = /^[A-ZА-Яa-zа-я_-\d]+$/;
  const containLetter = /[A-Za-z_-]+/;

  if (!str.trim()) {
    result.isValid = false;
    result.helper = 'This field is required';
  } else if (str.length < 3 || str.length > 20) {
    result.isValid = false;
    result.helper = 'This field must contain 3-20 characters';
  } else if (!unacceptableSymbols.test(str)) {
    result.isValid = false;
    result.helper = 'The field must contain only numbers, letter or "-" "_"';
  } else if (!containLetter.test(str)) {
    result.isValid = false;
    result.helper = 'The field must not contain only numbers';
  }
  return result;
};

export const passwordValidator: Validator = (str: string) => {
  const result = { isValid: true, helper: '' };

  const uppercaseOrNumber = /^(?=.*[0-9])(?=.*[A-ZА-Я])/;

  if (!str.trim()) {
    result.isValid = false;
    result.helper = 'This field is required';
  } else if (str.length < 8 || str.length > 40) {
    result.isValid = false;
    result.helper = 'This field must contain 8-40 characters';
  } else if (!uppercaseOrNumber.test(str)) {
    result.isValid = false;
    result.helper = 'This field must contain at least 1 numeric and uppercase character';
  }
  return result;
};

export const confirmPasswordValidator = (str: string, confStr: string) => {
  const result = { isValid: true, helper: '' };

  if (!str.trim()) {
    result.isValid = false;
    result.helper = 'This field is required';
  } else if (str !== confStr) {
    result.isValid = false;
    result.helper = 'Password and confirmation password do not match';
  }
  return result;
};

export const emailValidator: Validator = (str: string) => {
  const result = { isValid: true, helper: '' };

  const email = /^.+@[\w-]+\.[a-z]{2,}$/;

  if (!str.trim()) {
    result.isValid = false;
    result.helper = 'This field is required';
  } else if (!email.test(str)) {
    result.isValid = false;
    result.helper = 'This field must contain @ and "."';
  }
  return result;
};

export const phoneValidator: Validator = (str: string) => {
  const result = { isValid: true, helper: '' };

  const plusOrNumbers = /^\+?[\d]+$/;

  if (!str.trim()) {
    result.isValid = false;
    result.helper = 'This field is required';
  } else if (!plusOrNumbers.test(str)) {
    result.isValid = false;
    result.helper = 'This field must contain only "+" and numbers';
  } else if (str.length < 10 || str.length > 15) {
    result.isValid = false;
    result.helper = 'This field must contain 10-15 characters';
  }
  return result;
};

export const messageValidator: Validator = (str: string) => {
  const result = { isValid: true, helper: '' };
  if (!str.trim()) {
    result.isValid = false;
    result.helper = 'This field is required';
  }
  return result;
};

export const nameValidator: Validator = (str: string) => {
  const result = { isValid: true, helper: '' };
  const capitalLetter = /^[A-ZА-Я]/;
  const unacceptableSymbols = /^[A-ZА-Яa-zа-я-]+$/;

  if (!str.trim()) {
    result.isValid = false;
    result.helper = 'This field is required';
  } else if (!capitalLetter.test(str)) {
    result.isValid = false;
    result.helper = 'The first letter must be uppercase';
  } else if (!unacceptableSymbols.test(str)) {
    result.isValid = false;
    result.helper = 'The field must contain only Latin, Cyrillic letter or "-"';
  }
  return result;
};
