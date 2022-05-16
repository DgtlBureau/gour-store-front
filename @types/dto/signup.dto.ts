export type SignUpDto = Readonly<{
  role: 'CLIENT' | 'COMPANY' | 'COLLECTIVE_PURCHASE';
  phone: string;
  sms: string;
  password: string;
  passwordConfirm: string;
  referral: string;
}>;
