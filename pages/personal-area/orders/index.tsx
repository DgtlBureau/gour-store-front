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

  const { data: ordersList = [], isLoading, isError } = useGetOrdersListQuery();

  const formattedOrdersList = ordersList.map(order => formatOrderData(order, language, currency));

  const groupedOrders = groupOrdersByDate(formattedOrdersList);

  const orderEntries = Object.entries(groupedOrders);

  if (isLoading) {
    return (
      <PALayout>
        <ProgressLinear />
      </PALayout>
    );
  }

  if (isError) {
    return (
      <PALayout>
        <Typography variant='h5'>Произошла ошибка</Typography>
      </PALayout>
    );
  }

  return (
    <PrivateLayout>
      <PALayout>
        <Stack sx={{ margin: '15px 0 0 0' }} spacing={2}>
          {orderEntries.length ? (
            orderEntries.map(([key, orderGroup]) => (
              <OrdersCardGroup key={key} date={orderGroup.date} ordersList={orderGroup.orderList} />
            ))
          ) : (
            <Typography variant='h5'>Список заказов пуст</Typography>
          )}
        </Stack>
      </PALayout>
    </PrivateLayout>
  );
}

export default Orders;
