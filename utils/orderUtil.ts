import { BasketProduct } from 'store/slices/orderSlice';

import { ICategory } from 'types/entities/ICategory';

import { getPriceByGrams } from './currencyUtil';

export const filterOrderProductsByCategories = (orderProducts: BasketProduct[], categories: ICategory[]) => {
  const promoCodeCategoriesIds = categories.map(category => category.id);

  return orderProducts.filter(orderProduct =>
    orderProduct.product.categories?.some(productCategory => promoCodeCategoriesIds.includes(productCategory.id)),
  );
};

export const getOrderDiscountValue = (discountPercent: number, orderProducts: BasketProduct[]) =>
  orderProducts.reduce((acc, { product, gram, amount }) => {
    const discountByOneGram = product.totalCost * (discountPercent / 100);
    const discountByGrams = getPriceByGrams(discountByOneGram, gram);

    return acc + discountByGrams * amount;
  }, 0);
