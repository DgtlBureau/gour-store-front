import React, { forwardRef } from 'react';

import { Typography } from 'components/UI/Typography/Typography';

import { FullOrder, OrdersCard } from '../Card/Card';

export type OrdersGroupProps = {
  date: string;
  ordersList: FullOrder[];
};

export const OrdersCardGroup = forwardRef<HTMLDivElement, OrdersGroupProps>(({ date, ordersList }, ref) => (
  <div ref={ref}>
    <Typography variant='h6'>{date}</Typography>

    {ordersList.map(order => (
      <OrdersCard key={order.title} order={order} />
    ))}
  </div>
));
