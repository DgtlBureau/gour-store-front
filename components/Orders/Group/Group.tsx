import React from 'react';

import { format } from 'date-fns';

import { Box } from 'components/UI/Box/Box';
import { Typography } from 'components/UI/Typography/Typography';

import { FullOrder, OrdersCard } from '../Card/Card';

export type OrdersGroupProps = {
  date: Date;
  ordersList: FullOrder[];
};

export function OrdersCardGroup({ date, ordersList }: OrdersGroupProps) {
  const groupDate = format(date, 'yyyy.MM.d');

  return (
    <Box>
      <Typography variant='h6'>{groupDate}</Typography>

      {ordersList.map(order => (
        <OrdersCard key={order.title} order={order} />
      ))}
    </Box>
  );
}
