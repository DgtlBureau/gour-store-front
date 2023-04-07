import { IBase } from './IBase';

export interface IClientRole extends IBase {
  title: string;
  key: string;
}

export const ROLE_INDIVIDUAL = 'individual';
export const ROLE_COMPANY = 'company';
