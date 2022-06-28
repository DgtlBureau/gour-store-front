import React from 'react';

import { Stack } from '@mui/material';
import { formatOrderData, groupOrdersByDate } from './ordersHelper';
import { OrdersCardGroup } from '../../../components/Orders/Group/Group';
import { ProgressLinear } from '../../../components/UI/ProgressLinear/ProgressLinear';
import { Typography } from '../../../components/UI/Typography/Typography';
import { PALayout } from '../../../layouts/PA/PA';
import { useGetOrdersListQuery } from 'store/api/orderApi';

export function Orders() {
  const lang = 'ru';
  const currency = 'cheeseCoin';

  const { data: ordersList = [], isLoading, isError } = useGetOrdersListQuery();

  const formattedOrdersList = ordersList.map(order => {
    return formatOrderData(order, lang, currency);
  });

  const groupedOrders = groupOrdersByDate(formattedOrdersList);

  if (isLoading) {
    return (
      <PALayout>
        <ProgressLinear variant={'buffer'} />
      </PALayout>
    );
  }

  if (!isLoading && isError) {
    return (
      <PALayout>
        <Typography variant="h4">Произошла ошибка</Typography>
      </PALayout>
    );
  }

  return (
    <PALayout>
      <Stack sx={{ margin: '15px 0 0 0' }} spacing={2}>
        {Object.keys(groupedOrders).map(key => {
          const orderGroup = groupedOrders[+key];
          return (
            <OrdersCardGroup
              key={key}
              date={orderGroup.date}
              ordersList={orderGroup.orderList}
              currency={currency}
            />
          );
        })}
      </Stack>
    </PALayout>
  );
}

export default Orders;
