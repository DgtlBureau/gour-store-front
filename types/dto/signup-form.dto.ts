import { Role } from '../entities/Role';

export type SignUpFormDto = Readonly<{
  role: Role;
  email: string;
  sms: string;
  firstName: string;
  lastName: string;
  password: string;
  passwordConfirm: string;
}>;
