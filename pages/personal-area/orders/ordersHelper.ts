import { endOfDay, getTime } from 'date-fns';

import { FullOrder } from 'components/Orders/Card/Card';
import { OrderProductType } from 'components/Orders/Card/CardProduct';

import { Currency } from 'types/entities/Currency';
import { IOrder } from 'types/entities/IOrder';

import { formatDate } from 'utils/dateUtil';
import { getFullName } from 'utils/nameUtil';

export function formatOrderData(order: IOrder, lang: 'ru' | 'en', currency: Currency): FullOrder {
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

  const title = (order.crmInfo?.id || order.uuid).toString();
  const address = `${city.name[lang]}, ${street}, ${house}, кв. ${apartment},`;
  const status = order.crmInfo?.status;
  const createdAt = new Date(order.createdAt);

  return {
    title,
    status,
    createdAt,
    address,
    client,
    products,
    promotions,
    deliveryCost: 500, // TODO: данные должны идти с бека©,
    currency,
    totalSum: order.totalSum,
  };
}

export const groupOrdersByDate = (ordersList: FullOrder[]) =>
  ordersList.reduce<Record<string, FullOrder[]>>((acc, order) => {
    const orderKey = formatDate(order.createdAt, 'd MMMM yyyy');

    acc[orderKey] ??= [];

    acc[orderKey].push(order);
    return acc;
  }, {});

export const getProductKeyInBasket = (productId: number, gram: number) => `${productId}:${gram}`;
