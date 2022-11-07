import React from 'react';

import { Box } from 'components/UI/Box/Box';
import { Typography } from 'components/UI/Typography/Typography';

import { FullOrder, OrdersCard } from '../Card/Card';

export type OrdersGroupProps = {
  date: string;
  ordersList: FullOrder[];
};

export function OrdersCardGroup({ date, ordersList }: OrdersGroupProps) {
  return (
    <Box>
      <Typography variant='h6'>{date}</Typography>

      {ordersList.map(order => (
        <OrdersCard key={order.title} order={order} />
      ))}
    </Box>
  );
}
