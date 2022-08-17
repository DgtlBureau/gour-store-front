export type SignUpDto = {
  firstName: string;
  lastName: string;
  phone: string;
  code: string;
  password: string;
  referralCode?: string;
  cityId: number;
  roleId: number;
};
