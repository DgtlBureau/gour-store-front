import React from 'react';
import { Stack } from '@mui/material';

import { useGetInvoiceListQuery } from 'store/api/invoiceApi';
import { IInvoice } from 'types/entities/IInvoice';
import { PALayout } from 'layouts/PA/PA';
import { PrivateLayout } from 'layouts/Private/Private';

import { PaymentsCardGroup } from 'components/Payment/Group/Group';
import { Typography } from 'components/UI/Typography/Typography';
import { ProgressLinear } from 'components/UI/ProgressLinear/ProgressLinear';

import { formatPaymentsByDate, sortPaymentsByDate } from './paymentsHelpers';

export type FullInvoice = {
  id: IInvoice['id'];
  cheeseCoinCount: IInvoice['amount'];
  status: IInvoice['status'];
  updatedAt: Date;
  expiresAt: Date;
};

export function Payments() {
  const { data: invoicesList = [], isLoading, isError, refetch } = useGetInvoiceListQuery();

  if (isLoading) {
    return (
      <PALayout>
        <ProgressLinear />
      </PALayout>
    );
  }

  if (!isLoading && isError) {
    return (
      <PALayout>
        <Typography variant='h5'>Произошла ошибка</Typography>
      </PALayout>
    );
  }

  const formattedPayments = formatPaymentsByDate(invoicesList);
  const paymentsEntries = sortPaymentsByDate(formattedPayments);

  return (
    <PrivateLayout>
      <PALayout>
        <Stack sx={{ marginTop: '15px' }} spacing={5}>
          {paymentsEntries.length ? (
            paymentsEntries.map(([date, paymentsList]) => (
              <PaymentsCardGroup key={date} date={new Date(date)} paymentsList={paymentsList} refetch={refetch} />
            ))
          ) : (
            <Typography variant='h5'>Список платежей пуст</Typography>
          )}
        </Stack>
      </PALayout>
    </PrivateLayout>
  );
}

export default Payments;
