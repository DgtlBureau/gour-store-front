/* eslint-disable import/no-duplicates */
import React from 'react';

import { Box } from 'components/UI/Box/Box';
import { Typography } from 'components/UI/Typography/Typography';

import { formatDate } from 'utils/dateUtil';

import { FullInvoice, PaymentTabs } from 'pages/personal-area/payments';

import { PaymentsCard } from '../Card/Card';
import sx from './Group.styles';

export type OrdersGroupProps = {
  date: Date;
  paymentsList: FullInvoice[];
  type: PaymentTabs;
  refetch: () => void;
};

export function PaymentsCardGroup({ date, paymentsList, type, refetch }: OrdersGroupProps) {
  const groupDate = formatDate(new Date(date), 'd MMMM yyyy');

  return (
    <Box sx={sx.container}>
      <Typography variant='h6' sx={sx.title}>
        {groupDate}
      </Typography>

      {paymentsList.map(payment => (
        <PaymentsCard key={payment.uuid} type={type} payment={payment} refetch={refetch} />
      ))}
    </Box>
  );
}
