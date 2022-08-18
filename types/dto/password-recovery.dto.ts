export type PasswordRecoveryDto = Readonly<{
  phone: string;
  sms: string;
  password: string;
  passwordConfirm: string;
}>;
