export type SignUpDto = Readonly<{
  type: 'physical' | 'organization' | 'procurementOrganizer';
  phone: string;
  sms: string;
  password: string;
  passwordConfirm: string;
  referral: string;
}>;
