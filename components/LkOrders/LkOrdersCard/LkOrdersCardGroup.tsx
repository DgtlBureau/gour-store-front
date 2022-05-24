import { Stack } from '@mui/material';
import { Currency } from '../../../@types/entities/Currency';
import { format } from 'date-fns';
import React from 'react';
import { LkOrdersCard, LkOrdersCardProps } from './LkOrdersCard';
import s from './LkOrdersCard.module.scss';
import { Typography } from 'components/UI/Typography/Typography';

export type LkOrdersCardGroupProps = {
  date: Date;
  ordersList: LkOrdersCardProps[];
  currency: Currency;
};

export function LkOrderCardGroup({
  date,
  ordersList,
  currency,
}: LkOrdersCardGroupProps) {
  const groupDate = format(date, 'yyyy.MM.d');

  return (
    <Stack spacing={1}>
      <Typography variant="h6">{groupDate}</Typography>
      {ordersList.map(order => (
        <LkOrdersCard
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
    </Stack>
  );
}
