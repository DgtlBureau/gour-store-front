import { IProduct } from '../@types/entities/IProduct';

const NOW = new Date();

export function addProductDiscount(product: IProduct): IProduct {
  const discount = getProductDiscount(product);

  return { ...product, discount, promotions: undefined };
}

export function getProductDiscount(product: IProduct) {
  if (!product.promotions?.length) return 0;

  return product.promotions?.reduce((prev, curr) => {
    const isActualPromotion = new Date(curr.end) > NOW;
    const prevDiscountIsLess = prev.discount < curr.discount;

    return isActualPromotion && prevDiscountIsLess ? curr : prev;
  }).discount;
}
