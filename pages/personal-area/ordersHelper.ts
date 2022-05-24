import { IOrder } from '../../@types/entities/IOrder';
import { Currency } from '../../@types/entities/Currency';
import { LkOrdersCardProps } from 'components/LkOrders/LkOrdersCard/LkOrdersCard';
import { endOfDay, getTime, isSameDay } from 'date-fns';

export function formatOrderData(
  order: IOrder,
  lang: 'ru' | 'en',
  currency: Currency
): LkOrdersCardProps {
  const client = order.order.firstName + ' ' + order.order.lastName;
  const products = order.order.orderProducts.map(product => ({
    photo: product.product.images[0]?.small || '',
    title: product.product.title[lang],
    weight: product.weight,
    amount: product.amount,
    cost: product.product.price[currency],
    isWeightGood: product.product.isWeightGood,
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
  orderList: LkOrdersCardProps[];
};

export function groupOrdersByDate(ordersList: LkOrdersCardProps[]) {
  const someObj: Record<number, formattedOrder> = {};

  const test = ordersList.forEach(order => {
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
