import React from 'react';

import { Stack } from '@mui/material';

import { useGetOrdersListQuery } from 'store/api/orderApi';

import { PALayout } from 'layouts/PA/PA';
import { PrivateLayout } from 'layouts/Private/Private';

import { useAppNavigation } from 'components/Navigation';
import { OrdersCardGroup } from 'components/Orders/Group/Group';
import { ProgressLinear } from 'components/UI/ProgressLinear/ProgressLinear';
import { Typography } from 'components/UI/Typography/Typography';

import { formatOrderData, groupOrdersByDate } from './ordersHelper';

export function Orders() {
  const { language, currency } = useAppNavigation();

  const { data: ordersData = [], isLoading, isError, isSuccess } = useGetOrdersListQuery();

  const formattedOrdersList = ordersData.map(order => formatOrderData(order, language, currency));
  const groupedOrders = groupOrdersByDate(formattedOrdersList);
  const orderEntries = Object.entries(groupedOrders);

  return (
    <PrivateLayout>
      <PALayout>
        <Stack sx={{ margin: '15px 0 0 0' }} spacing={2}>
          {isLoading && <ProgressLinear />}
          {isError && <Typography variant='h5'>Произошла ошибка</Typography>}

          {isSuccess &&
            (orderEntries.length ? (
              orderEntries.map(([dateKey, ordersList]) => (
                <OrdersCardGroup key={dateKey} date={dateKey} ordersList={ordersList} />
              ))
            ) : (
              <Typography variant='h5'>Список заказов пуст</Typography>
            ))}
        </Stack>
      </PALayout>
    </PrivateLayout>
  );
}

export default Orders;
