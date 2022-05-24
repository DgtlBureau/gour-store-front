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
import { Stack } from '@mui/material';
import { formatOrderData, groupOrdersByDate } from './ordersHelper';
import { LkOrderCardGroup } from 'components/LkOrders/LkOrdersCard/LkOrdersCardGroup';
import { ProgressLinear } from '../../components/UI/ProgressLinear/ProgressLinear';
import { Typography } from 'components/UI/Typography/Typography';

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

  const formattedOrdersList: LkOrdersCardProps[] = ordersList.map(order => {
    return formatOrderData(order, lang, currency);
  });

  const groupedOrders = groupOrdersByDate(formattedOrdersList);

  if (isLoading) {
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
        <ProgressLinear variant={'buffer'} />
      </ShopLayout>
    );
  }

  if (!isLoading && isError) {
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
        <Typography variant="h4">Произошла ошибка</Typography>
      </ShopLayout>
    );
  }

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
      <Stack sx={{ margin: '15px 0 0 0' }} spacing={2}>
        {Object.keys(groupedOrders).map(key => {
          const orderGroup = groupedOrders[+key];
          return (
            <LkOrderCardGroup
              date={orderGroup.date}
              ordersList={orderGroup.orderList}
              currency={currency}
            />
          );
        })}
      </Stack>
    </ShopLayout>
  );
}

export default Orders;
