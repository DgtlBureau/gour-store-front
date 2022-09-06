import { ClipboardEvent, FormEvent } from 'react';

const phonePrefix = '+7';
const phoneMask = `${phonePrefix} (***) ***-**-**`;

export const formatPhoneValue = (input: string): string => {
  const digitsArr = input.replace(/\D/g, '').split('');

  if (!digitsArr.length) {
    return `${phonePrefix} (`;
  }

  const needCutPrefix = /^7|8/.test(digitsArr[0]);
  if (needCutPrefix) {
    digitsArr.shift();
  }

  return phoneMask.replace(/\*/g, () => digitsArr.splice(0, 1)[0] || '').replace(/\D+$/, '');
};

export const onPhonePaste = (e: ClipboardEvent<HTMLInputElement>) => {
  const pastedText = e.clipboardData.getData('Text');
  e.currentTarget.value = formatPhoneValue(pastedText);
};

export const onPhoneInput = (event: FormEvent<HTMLInputElement>) => {
  event.currentTarget.value = formatPhoneValue(event.currentTarget.value);
};
