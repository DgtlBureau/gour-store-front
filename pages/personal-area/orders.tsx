import { LkOrderProfileItem } from 'components/LkOrderProfiles/LkOrderProfileItem/LkOrderProfileItem';
import {
  LkOrdersCard,
  LkOrdersCardProps,
} from '../../components/LkOrders/LkOrdersCard/LkOrdersCard';
import { OrderProductType } from 'components/LkOrders/LkOrdersCard/ProductCard';
import { LkMenu } from '../../components/UI/LkMenu/LkMenu';
import { useRouter } from 'next/router';
import React from 'react';
import { useGetCityListQuery } from 'store/api/cityApi';
import { useGerOrdersListQuery } from 'store/api/orderApi';
import { ShopLayout } from '../../layouts/Shop/Shop';
import { format } from 'date-fns';

export type OrdersProps = {};

const menuList = [
  {
    label: 'Главная',
    path: '/',
  },
  {
    label: 'Заказы',
    path: '/orders',
  },
  {
    label: 'Личные данные',
    path: '/personal-data',
  },
];

export function Orders({}: OrdersProps) {
  const router = useRouter();
  const lang = 'ru';
  const currency = 'rub';

  const { data: ordersList = [], isLoading, isError } = useGerOrdersListQuery();
  const { data: cityList = [] } = useGetCityListQuery();

  console.log('orders', ordersList);

  const formattedOrdersList: LkOrdersCardProps[] = ordersList.map(order => {
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

    const orderCreatedDate = new Date(order.order.createdAt);

    const createdDate = format(orderCreatedDate, 'yyyy.MM.d');
    const createdTime = format(orderCreatedDate, 'HH:mm');
    const createdAt = `от ${createdDate} в ${createdTime}`;

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
  });

  return (
    <ShopLayout>
      <LkMenu
        title="История заказов"
        active={'Заказы'}
        menuList={menuList}
        onItemClick={(path: string) => {
          router.push('/personal-area' + path);
        }}
      />
      {formattedOrdersList.map(order => (
        <LkOrdersCard
          key={order.title}
          title={order.title}
          status={order.status}
          createdAt={order.createdAt}
          address={order.address}
          client={order.client}
          currency={currency}
          products={order.products}
          promotions={order.promotions}
          deliveryCost={order.deliveryCost}
        />
      ))}
    </ShopLayout>
  );
}

export default Orders;
