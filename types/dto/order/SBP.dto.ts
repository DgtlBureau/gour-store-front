export enum UserAgent {
  MOBILE = 'mobile',
  DESKTOP = 'desktop',
}

export type SBPDto = {
  userAgent: UserAgent;
  ipAddress: string;
  currency: string;
  amount: number;
  description: string;
  invoiceUuid: string;
  payerUuid: string;
  email: string;
};
