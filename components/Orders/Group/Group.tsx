import { format } from 'date-fns';
import React from 'react';

import { Box } from 'components/UI/Box/Box';
import { Typography } from 'components/UI/Typography/Typography';
import { Currency } from '../../../@types/entities/Currency';
import { OrdersCard, OrdersCardProps } from '../Card/Card';

export type OrdersGroupProps = {
  date: Date;
  ordersList: OrdersCardProps[];
  currency: Currency;
};

export function OrdersCardGroup({ date, ordersList, currency }: OrdersGroupProps) {
  const groupDate = format(date, 'yyyy.MM.d');

  return (
    <Box>
      <Typography variant="h6">{groupDate}</Typography>
      {ordersList.map(order => (
        <OrdersCard
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
    </Box>
  );
}
