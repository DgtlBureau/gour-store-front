import React, { useCallback, useEffect, useState } from 'react';

import { Stack } from '@mui/material';

import { useGetCurrentUserQuery } from 'store/api/currentUserApi';
import { useGetOrdersListQuery } from 'store/api/orderApi';

import { PALayout } from 'layouts/PA/PA';
import { PrivateLayout } from 'layouts/Private/Private';

import { useAppNavigation } from 'components/Navigation';
import { OrdersCardGroup } from 'components/Orders/Group/Group';
import { InfiniteScroll } from 'components/UI/InfiniteScroll/InfiniteScroll';
import { Typography } from 'components/UI/Typography/Typography';

import { IOrder } from 'types/entities/IOrder';

import { formatOrderData, groupOrdersByDate } from './ordersHelper';

export function Orders() {
  const { language, currency } = useAppNavigation();

  const [orders, setOrders] = useState<IOrder[]>([]);
  const [page, setPage] = useState(1);

  const length = 15;

  const offset = (page - 1) * length;

  const { data: ordersData, isFetching, isError, isSuccess } = useGetOrdersListQuery({ length, offset });
  const { data: currentUser } = useGetCurrentUserQuery();

  const totalCount = ordersData?.totalCount || 0;

  const hasMore = orders.length < totalCount;

  const formattedOrdersList = orders.map(order =>
    formatOrderData(order, language, currency, currentUser?.city.deliveryCost),
  );
  const groupedOrders = groupOrdersByDate(formattedOrdersList);
  const orderEntries = Object.entries(groupedOrders);

  const turnPage = useCallback(() => {
    setPage(currPage => currPage + 1);
  }, []);

  useEffect(() => {
    const newOrders = ordersData?.orders || [];

    setOrders(prevOrders => [...prevOrders, ...newOrders]);
  }, [ordersData]);

  const isEmptyOrders = isSuccess && !orderEntries.length;

  return (
    <PrivateLayout>
      <PALayout>
        <Stack spacing={2}>
          {isError && <Typography variant='h5'>Произошла ошибка</Typography>}

          <InfiniteScroll hasMore={hasMore} isLoading={isFetching} onUpload={turnPage}>
            {orderEntries.map(([dateKey, ordersList]) => (
              <OrdersCardGroup key={dateKey} date={dateKey} ordersList={ordersList} />
            ))}
          </InfiniteScroll>

          {isEmptyOrders && <Typography variant='h5'>Список заказов пуст</Typography>}
        </Stack>
      </PALayout>
    </PrivateLayout>
  );
}

export default Orders;
