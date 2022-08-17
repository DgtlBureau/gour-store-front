export type SignUpDto = {
  firstName: string;
  lastName: string;
  phone: string;
  code: number;
  password: string;
  referralCode?: string;
  cityId: number;
  roleId: number;
};
