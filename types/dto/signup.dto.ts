export type SignUpDto = {
  firstName: string;
  lastName: string;
  email: string;
  code: string;
  password: string;
  referralCode?: string;
  cityId: number;
  roleId: number;
};
