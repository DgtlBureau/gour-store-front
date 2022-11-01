/* eslint-disable import/no-duplicates */
import React from 'react';

import { Box } from 'components/UI/Box/Box';
import { Typography } from 'components/UI/Typography/Typography';

import { formatDate } from 'utils/dateUtil';

import { ru } from 'date-fns/locale';
import { FullInvoice } from 'pages/personal-area/payments';

import { PaymentsCard } from '../Card/Card';
import sx from './Group.styles';

export type OrdersGroupProps = {
  date: Date;
  paymentsList: FullInvoice[];
  refetch: () => void;
};

export function PaymentsCardGroup({ date, paymentsList, refetch }: OrdersGroupProps) {
  const groupDate = formatDate(new Date(date), 'd MMMM yyyy', { locale: ru });

  return (
    <Box>
      <Typography variant='h6' sx={sx.title}>
        {groupDate}
      </Typography>

      {paymentsList
        .sort((a, b) => b.updatedAt.getTime() - a.updatedAt.getTime()) // TODO: желательно вынести на уровень выше
        .map(payment => (
          <PaymentsCard key={payment.uuid} payment={payment} refetch={refetch} />
        ))}
    </Box>
  );
}
