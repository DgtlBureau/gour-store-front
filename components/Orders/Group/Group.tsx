import { Currency } from '../../../@types/entities/Currency';
import { format } from 'date-fns';
import React from 'react';

import { Box } from 'components/UI/Box/Box';
import { Typography } from 'components/UI/Typography/Typography';
import { OrdersCard, FullOrder } from '../Card/Card';

export type OrdersGroupProps = {
  date: Date;
  ordersList: FullOrder[];
};

export function OrdersCardGroup({ date, ordersList }: OrdersGroupProps) {
  const groupDate = format(date, 'yyyy.MM.d');

  return (
    <Box>
      <Typography variant="h6">{groupDate}</Typography>

      {ordersList.map(order => (
        <OrdersCard key={order.title} order={order} />
      ))}
    </Box>
  );
}
