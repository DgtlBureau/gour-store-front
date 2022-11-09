/* eslint-disable import/no-duplicates */
import React from 'react';

import { FullInvoice, PaymentTabs } from 'pages/personal-area/payments';

import { Box } from 'components/UI/Box/Box';
import { Typography } from 'components/UI/Typography/Typography';

import { IInvoice } from 'types/entities/IInvoice';

import { formatDate } from 'utils/dateUtil';

import { PaymentsCard } from '../Card/Card';
import sx from './Group.styles';

export type OrdersGroupProps = {
  date: Date;
  paymentsList: FullInvoice[];
  payerUuid: string;
  type: PaymentTabs;
  refetch: () => void;
  onRepay: (invoiceUuid: IInvoice['uuid'], price: number) => void;
};

export function PaymentsCardGroup({ date, paymentsList, payerUuid, type, refetch, onRepay }: OrdersGroupProps) {
  const groupDate = formatDate(new Date(date), 'd MMMM yyyy');

  return (
    <Box sx={sx.container}>
      <Typography variant='h6' sx={sx.title}>
        {groupDate}
      </Typography>

      {paymentsList.map(payment => (
        <PaymentsCard
          key={payment.uuid}
          type={type}
          payment={payment}
          payerUuid={payerUuid}
          refetch={refetch}
          onRepay={onRepay}
        />
      ))}
    </Box>
  );
}
