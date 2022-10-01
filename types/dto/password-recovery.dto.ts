export type PasswordRecoveryDto = Readonly<{
  email: string;
  code: string;
  password: string;
  passwordConfirm: string;
}>;
