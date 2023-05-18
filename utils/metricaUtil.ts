import { IProduct } from '../types/entities/IProduct';
import { getPriceByGrams } from './currencyUtil';
import { getPriceByRole } from '../types/entities/IPrice';
import { ICurrentUser } from '../types/entities/ICurrentUser';

export const getProductForDataLayer = (gram: number, product: IProduct, user?: ICurrentUser, qty = 1,isCash = false): object => {
  const price = getPriceByRole(
      product.price,
      user?.role,
      isCash
  );

  return {
      'id': product.id,
      'name': product.title.ru,
      'price': getPriceByGrams(price, gram),
      'quantity': qty,
      'variant': `${gram}гр`
  };
};
