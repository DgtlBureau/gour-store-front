import React, { useState } from 'react';

import { Stack } from '@mui/material';

import { useGetCurrentUserQuery } from 'store/api/currentUserApi';
import { useBuyCheeseCoinsMutation, useGetInvoiceListQuery } from 'store/api/invoiceApi';
import { useGetCurrentTransactionsQuery } from 'store/api/walletApi';

import { PALayout } from 'layouts/PA/PA';
import { PrivateLayout } from 'layouts/Private/Private';

import { BuyCheeseCoinsModal } from 'components/Cheesecoins/BuyModal/BuyModal';
import { useAppNavigation } from 'components/Navigation';
import { PaymentsCardGroup } from 'components/Payment/Group/Group';
import { ProgressLinear } from 'components/UI/ProgressLinear/ProgressLinear';
import { TabPanel } from 'components/UI/Tabs/TabPanel';
import { Tabs } from 'components/UI/Tabs/Tabs';
import { Typography } from 'components/UI/Typography/Typography';

import { PayInvoiceDto } from 'types/dto/invoice/payInvoice.dto';
import { IInvoice, InvoiceStatus } from 'types/entities/IInvoice';
import { IWalletTransaction } from 'types/entities/IWalletTransaction';
import { NotificationType } from 'types/entities/Notification';

import { dispatchNotification } from 'packages/EventBus';
import { getErrorMessage } from 'utils/errorUtil';

import { formatInvoicesByDate, formatTransactionsByDate, sortPaymentsByDate } from './paymentsHelpers';

type BuyCheeseCoinState =
  | { isOpen: false; price: null; invoiceUuid: string | null }
  | { isOpen: true; price: number; invoiceUuid: string };

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
  coins: number; // кол-во сырных монеток
  value: number; // стоимость
  status: IInvoice['status'] | IWalletTransaction['type'];
  updatedAt: Date;
  expiresAt: Date | null;
  description: IWalletTransaction['description'] | null;
};

export function Payments() {
  const { goToSuccessPayment, goToFailurePayment } = useAppNavigation();

  const [currentTab, changeCurrentTab] = useState<PaymentTabs>(PaymentTabs.INVOICE);
  const [buyCheeseCoinState, setBuyCheeseCoinState] = useState<BuyCheeseCoinState>({
    isOpen: false,
    price: null,
    invoiceUuid: null,
  });

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

  const [buyCheeseCoins, { isLoading: isPaymentLoading }] = useBuyCheeseCoinsMutation();

  const handleRepay = (invoiceUuid: IInvoice['uuid'], price: number) =>
    setBuyCheeseCoinState({
      isOpen: true,
      price,
      invoiceUuid,
    });

  const handleCloseBuyModal = () => {
    setBuyCheeseCoinState({
      isOpen: false,
      invoiceUuid: null,
      price: null,
    });
  };

  const handleBuyCheeseCoins = async (buyData: PayInvoiceDto) => {
    try {
      const result = await buyCheeseCoins(buyData).unwrap();
      if (result.status === InvoiceStatus.PAID) goToSuccessPayment(buyData.price);
      if (result.status === InvoiceStatus.FAILED) goToFailurePayment();
    } catch (e) {
      const mayBeError = getErrorMessage(e);
      if (mayBeError) {
        dispatchNotification(mayBeError, { type: NotificationType.DANGER });
      } else {
        goToFailurePayment();
      }
    }
  };

  const showInvoicesList = !isFetchingInvoices && !isErrorInvoices;
  const showTransactionsList = !isFetchingTransactions && !isErrorTransactions;

  return (
    <PrivateLayout>
      <PALayout>
        <Stack spacing={5}>
          {/* <Tabs options={tabOptions} value={currentTab} onChange={changeCurrentTab} /> */}

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
                    payerUuid={currentUser!.id}
                    refetch={refetch}
                    onRepay={handleRepay}
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
                    payerUuid={currentUser!.id}
                    refetch={refetch}
                    onRepay={handleRepay}
                  />
                ))
              ) : (
                <Typography variant='h5'>Список операций пуст</Typography>
              ))}
          </TabPanel>
        </Stack>

        <BuyCheeseCoinsModal
          isOpened={buyCheeseCoinState.isOpen}
          userEmail={currentUser?.email}
          userId={currentUser?.id}
          invoiceUuid={buyCheeseCoinState.invoiceUuid || undefined}
          price={buyCheeseCoinState.price || undefined}
          isLoading={isPaymentLoading}
          onClose={handleCloseBuyModal}
          onSubmit={handleBuyCheeseCoins}
        />
      </PALayout>
    </PrivateLayout>
  );
}

export default Payments;
