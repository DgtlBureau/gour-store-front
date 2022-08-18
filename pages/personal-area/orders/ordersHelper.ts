import { endOfDay, getTime } from 'date-fns';
import { OrdersCardProps } from 'components/Orders/Card/Card';
import { getFullName } from 'utils/getFullName';
import { Currency } from 'types/entities/Currency';
import { IOrder } from 'types/entities/IOrder';

export function formatOrderData(order: IOrder, lang: 'ru' | 'en', currency: Currency): OrdersCardProps {
  const client = getFullName(order.firstName, order.lastName || '');
  const products = order.orderProducts.map(product => ({
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

  const createdAt = new Date(order.createdAt);

  const { city, street, house, apartment } = order.orderProfile;

  return {
    title: order.crmInfo?.id || '####',
    status: {
      title: order.crmInfo?.status.name,
      color: order.crmInfo?.status.color,
    },
    createdAt,
    address: `${city}, ${street}, ${house}, кв. ${apartment},`,
    client,
    currency,
    products,
    promotions,
    deliveryCost: 500, // TODO: данные должны идти с бека©
  };
}

type formattedOrder = {
  date: Date;
  orderList: OrdersCardProps[];
};

export const groupOrdersByDate = (ordersList: OrdersCardProps[]) =>
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
