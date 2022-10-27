import { FullOrder } from 'components/Orders/Card/Card';

import { Currency } from 'types/entities/Currency';
import { IOrder } from 'types/entities/IOrder';

import { getFullName } from 'utils/nameUtil';

import { endOfDay, getTime } from 'date-fns';

export function formatOrderData(order: IOrder, lang: 'ru' | 'en', currency: Currency): FullOrder {
  const client = getFullName(order.firstName, order.lastName || '');

  const products = order.orderProducts.map(product => ({
    id: product.product?.id || -1,
    photo: product.product?.images[0]?.small || '',
    title: product.product?.title[lang],
    amount: product?.amount,
    cost: product.product?.price[currency],
  }));

  const promotions = order.promotions.map(promotion => ({
    title: promotion.title,
    amount: promotion.value,
  }));

  const createdAt = new Date(order.createdAt);

  const { city, street, house, apartment } = order.orderProfile;

  return {
    title: order.crmInfo?.id || '####',
    status: {
      title: order.crmInfo?.status.name,
      color: order.crmInfo?.status.color,
    },
    createdAt,
    address: `${city.name[lang]}, ${street}, ${house}, кв. ${apartment},`,
    client,
    products,
    promotions,
    deliveryCost: 500, // TODO: данные должны идти с бека©,
    currency,
  };
}

type formattedOrder = {
  date: Date;
  orderList: FullOrder[];
};

export const groupOrdersByDate = (ordersList: FullOrder[]) =>
  ordersList.reduce<Record<number, formattedOrder>>((acc, order) => {
    const createdDay = endOfDay(order.createdAt);
    const orderTime = getTime(createdDay);
    acc[orderTime] ??= {
      date: order.createdAt,
      orderList: [],
    };

    acc[orderTime].orderList.push(order);
    return acc;
  }, {});

export const getProductKeyInBasket = (productId: number, gram: number) => `${productId}:${gram}`;
