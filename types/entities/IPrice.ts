import { IBase } from './IBase';
import {IClientRole, ROLE_INDIVIDUAL} from "./IClientRole";

export interface IPrice extends IBase {
  cheeseCoin: number;
  individual: number;
  company: number;
  companyByCash: number;
}

export const getPriceByRole = (price?: IPrice, role?: IClientRole, cash = false): number => {
    if (!price) {
        return 0;
    }

    if (!role || role.key === ROLE_INDIVIDUAL) {
        return price.individual;
    }

    return cash ? price.companyByCash : price.company;
}
