import { IOrder } from '../../@types/entities/IOrder';
import { Currency } from '../../@types/entities/Currency';

import { endOfDay, getTime } from 'date-fns';
import { OrdersCardProps } from 'components/Orders/Card/Card';

export function formatOrderData(
  order: IOrder,
  lang: 'ru' | 'en',
  currency: Currency
): OrdersCardProps {
  const client = order.order.firstName + ' ' + order.order.lastName;
  const products = order.order.orderProducts.map(product => ({
    photo: product.product?.images[0]?.small || '',
    title: product.product?.title[lang],
    weight: product?.weight,
    amount: product?.amount,
    cost: product.product?.price[currency],
    isWeightGood: product?.product?.isWeightGood,
  }));

  const promotions = order.promotions.map(promotion => ({
    title: promotion.title,
    amount: promotion.value,
  }));

  const createdAt = new Date(order.order.createdAt);

  return {
    title: order.crmInfo.id,
    status: {
      title: order.crmInfo.status.name,
      color: order.crmInfo.status.color,
    },
    createdAt,
    address: 'Test',
    client,
    currency,
    products,
    promotions,
    deliveryCost: 500, //TODO: данные должны идти с бека©
  };
}

type formattedOrder = {
  date: Date;
  orderList: OrdersCardProps[];
};

export function groupOrdersByDate(ordersList: OrdersCardProps[]) {
  const someObj: Record<number, formattedOrder> = {};

  ordersList.forEach(order => {
    const createdDay = endOfDay(order.createdAt);
    const orderTime = getTime(createdDay);
    someObj[orderTime] = someObj[orderTime] || {
      date: order.createdAt,
      orderList: [],
    };

    someObj[orderTime].orderList.push(order);
  });

  console.log('someObj', someObj);

  return someObj;
}
