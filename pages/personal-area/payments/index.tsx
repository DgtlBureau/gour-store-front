import React, { useState } from 'react';

import { Stack } from '@mui/material';

import { useGetCurrentUserQuery } from 'store/api/currentUserApi';
import { useGetInvoiceListQuery } from 'store/api/invoiceApi';
import { useGetCurrentTransactionsQuery } from 'store/api/walletApi';

import { PALayout } from 'layouts/PA/PA';
import { PrivateLayout } from 'layouts/Private/Private';

import { PaymentsCardGroup } from 'components/Payment/Group/Group';
import { ProgressLinear } from 'components/UI/ProgressLinear/ProgressLinear';
import { TabPanel } from 'components/UI/Tabs/TabPanel';
import { Tabs } from 'components/UI/Tabs/Tabs';
import { Typography } from 'components/UI/Typography/Typography';

import { IInvoice } from 'types/entities/IInvoice';
import { IWalletTransaction } from 'types/entities/IWalletTransaction';

import { formatInvoicesByDate, formatTransactionsByDate, sortPaymentsByDate } from './paymentsHelpers';

export enum PaymentTabs {
  INVOICE = 'invoice',
  WALLET = 'wallet',
}

const tabOptions = [
  { label: 'Счета по карте', value: PaymentTabs.INVOICE as const },
  { label: 'История операций', value: PaymentTabs.WALLET as const },
];

export type FullInvoice = {
  uuid: IInvoice['uuid'];
  cheeseCoinCount: number;
  status: IInvoice['status'] | IWalletTransaction['type'];
  updatedAt: Date;
  expiresAt: Date | null;
  description: IWalletTransaction['description'] | null;
};

export function Payments() {
  const [currentTab, changeCurrentTab] = useState<PaymentTabs>(PaymentTabs.INVOICE);

  const { data: currentUser } = useGetCurrentUserQuery();
  const {
    invoicesList,
    isFetching: isFetchingInvoices,
    isError: isErrorInvoices,
    refetch,
  } = useGetInvoiceListQuery(
    { userId: currentUser?.id ?? '' },
    {
      skip: !currentUser?.id || currentTab !== 'invoice',
      selectFromResult: ({ data, ...rest }) => ({
        invoicesList: data ? sortPaymentsByDate(formatInvoicesByDate(data)) : [],
        ...rest,
      }),
    },
  );
  const {
    transactionsList,
    isFetching: isFetchingTransactions,
    isError: isErrorTransactions,
  } = useGetCurrentTransactionsQuery(undefined, {
    skip: currentTab !== 'wallet',
    selectFromResult: ({ data, ...rest }) => ({
      transactionsList: data ? sortPaymentsByDate(formatTransactionsByDate(data)) : [],
      ...rest,
    }),
  });

  const showInvoicesList = !isFetchingInvoices && !isErrorInvoices;
  const showTransactionsList = !isFetchingTransactions && !isErrorTransactions;

  return (
    <PrivateLayout>
      <PALayout>
        <Stack spacing={5}>
          <Tabs options={tabOptions} value={currentTab} onChange={changeCurrentTab} />

          <TabPanel value={currentTab} index={PaymentTabs.INVOICE}>
            {isFetchingInvoices && <ProgressLinear />}
            {isErrorInvoices && <Typography variant='h5'>Произошла ошибка</Typography>}

            {showInvoicesList &&
              (invoicesList.length ? (
                invoicesList.map(([date, paymentsList]) => (
                  <PaymentsCardGroup
                    key={date}
                    type={currentTab}
                    date={new Date(date)}
                    paymentsList={paymentsList}
                    refetch={() => ({})}
                  />
                ))
              ) : (
                <Typography variant='h5'>Список счетов пуст</Typography>
              ))}
          </TabPanel>

          <TabPanel value={currentTab} index={PaymentTabs.WALLET}>
            {isFetchingTransactions && <ProgressLinear />}
            {isErrorTransactions && <Typography variant='h5'>Произошла ошибка</Typography>}

            {showTransactionsList &&
              (transactionsList.length ? (
                transactionsList.map(([date, paymentsList]) => (
                  <PaymentsCardGroup
                    key={date}
                    type={currentTab}
                    date={new Date(date)}
                    paymentsList={paymentsList}
                    refetch={refetch}
                  />
                ))
              ) : (
                <Typography variant='h5'>Список операций пуст</Typography>
              ))}
          </TabPanel>
        </Stack>
      </PALayout>
    </PrivateLayout>
  );
}

export default Payments;
