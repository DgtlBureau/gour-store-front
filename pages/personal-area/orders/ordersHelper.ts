import { FullOrder } from 'components/Orders/Card/Card';
import { OrderProductType } from 'components/Orders/Card/CardProduct';

import { Currency } from 'types/entities/Currency';
import { IOrder } from 'types/entities/IOrder';

import { formatDate } from 'utils/dateUtil';
import { getFullName } from 'utils/nameUtil';

export function formatOrderData(order: IOrder, lang: 'ru' | 'en', currency: Currency, deliveryCost = 0): FullOrder {
  const client = getFullName(order.firstName, order.lastName || '');

  const products: OrderProductType[] = order.orderProducts.map(product => ({
    id: product.id,
    photo: product.product?.images[0]?.small || '',
    title: product.product?.title[lang],
    amount: product.amount,
    gram: product.gram,
    totalSum: product.totalSum,
    totalSumWithoutAmount: product.totalSumWithoutAmount,
    cost: product.product?.price[currency],
  }));

  const promotions = order.promotions.map(promotion => ({
    title: promotion.title,
    amount: promotion.value,
  }));

  const { city, street, house, apartment } = order.orderProfile;

  const title = order.leadId.toString() || '####';
  const address = `${city.name[lang]}, ${street}, ${house}, кв. ${apartment},`;
  const status = order.crmInfo?.status || 'ожидание';
  const createdAt = new Date(order.createdAt);

  return {
    title,
    status,
    createdAt,
    address,
    client,
    products,
    promotions,
    deliveryCost, // FIXME: данные должны идти с бека©,
    currency,
    totalSum: order.totalSum,
  };
}

export const groupOrdersByDate = (ordersList: FullOrder[]) =>
  [...ordersList]
    .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
    .reduce<Record<string, FullOrder[]>>((acc, order) => {
      const orderKey = formatDate(order.createdAt, 'd MMMM yyyy');

      acc[orderKey] ??= [];

      acc[orderKey].push(order);
      return acc;
    }, {});

export const getProductKeyInBasket = (productId: number, gram: number) => `${productId}:${gram}`;
