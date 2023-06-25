import { Role } from '../entities/Role';

export type SignUpFormDto = Readonly<{
  role: Role;
  email: string;
  code: string;
  firstName: string;
  lastName: string;
  password: string;
  passwordConfirm: string;
  city: string;
  referralCode: string;
}>;
