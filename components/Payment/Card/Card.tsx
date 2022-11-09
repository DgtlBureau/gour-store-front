import Image from 'next/image';
import React from 'react';

import { Grid, Tooltip, Typography } from '@mui/material';
import { FullInvoice, PaymentTabs } from 'pages/personal-area/payments';

import { useCreateInvoiceMutation } from 'store/api/invoiceApi';

import { Box } from 'components/UI/Box/Box';
import { Button } from 'components/UI/Button/Button';

import { IInvoice, InvoiceStatus } from 'types/entities/IInvoice';
import { IWalletTransaction } from 'types/entities/IWalletTransaction';
import { NotificationType } from 'types/entities/Notification';

import { useTimer } from 'hooks/useTimer';
import { dispatchNotification } from 'packages/EventBus';
import { getCurrencySymbol, getFormattedPrice } from 'utils/currencyUtil';
import { formatDate } from 'utils/dateUtil';

import '../../../.storybook/main';
import styles from './Card.module.css';
import sx from './Card.styles';
import { PayBtnKeys, payButtonFields, paymentColorByStatus } from './CardHelper';

import tooltipIcon from 'assets/icons/general/tooltip.svg';

function matchIsActualInvoiceDate(status: InvoiceStatus, expiresAt: Date | null) {
  const isActualDateForRepay = expiresAt && expiresAt.getTime() > new Date().getTime();
  const isActualStatusForRepay = [InvoiceStatus.WAITING, InvoiceStatus.FAILED].includes(status);

  return !!isActualDateForRepay && isActualStatusForRepay;
}

export type PaymentsCardProps = {
  payment: FullInvoice;
  type: PaymentTabs;
  payerUuid: string;
  refetch: () => void;
  onRepay: (invoiceUuid: IInvoice['uuid'], price: number) => void;
};

export function PaymentsCard({ payment, type, payerUuid, refetch, onRepay }: PaymentsCardProps) {
  const [createInvoice] = useCreateInvoiceMutation();

  const isInvoice = type === PaymentTabs.INVOICE;
  const canInvoiceRepay = isInvoice && matchIsActualInvoiceDate(payment.status as InvoiceStatus, payment.expiresAt);

  const { timerTime } = useTimer(payment.expiresAt || new Date(), { onEnd: refetch, needCount: canInvoiceRepay });

  const handleRepayClick = async () => {
    try {
      console.log('create');
      const invoice = await createInvoice({
        amount: payment.coins,
        currency: 'RUB',
        payerUuid,
        value: payment.coins,
      }).unwrap();

      console.log('created', invoice);
      onRepay(invoice.uuid, invoice.amount);
    } catch {
      dispatchNotification('Произошла ошибка, повторите снова', { type: NotificationType.DANGER });
    }
  };

  const invoiceStatus = paymentColorByStatus[payment.status];

  const cheeseCoinCount = getFormattedPrice(payment.coins);
  const currencySymbol = getCurrencySymbol('cheeseCoin');

  const formattedDate = formatDate(payment.updatedAt, 'dd.MM.yyyy');
  const formattedTime = formatDate(payment.updatedAt, 'H:mm');

  return (
    <Grid container sx={sx.container}>
      {isInvoice && (
        <Typography sx={sx.title} variant='h6'>
          Чизкоины
        </Typography>
      )}

      <Grid item sx={{ ...sx.statusBlock, ...(!isInvoice && sx.title) }}>
        <Typography sx={{ ...sx.status, ...sx[invoiceStatus.className] }}>{invoiceStatus.name}</Typography>

        <Typography variant='body1' sx={sx.statusDate}>
          от&nbsp;{formattedDate} в&nbsp;{formattedTime}
        </Typography>

        {payment.description && (
          <Tooltip title={payment.description} arrow>
            <div className={styles.statusTooltip}>
              <Image src={tooltipIcon} layout='fixed' width='20px' height='20px' />
            </div>
          </Tooltip>
        )}
      </Grid>

      {canInvoiceRepay && timerTime && (
        <Grid item sx={sx.timer}>
          <Typography sx={sx.timerLabel}>
            до отмены платежа&ensp;
            <Typography sx={sx.timerValue} variant='caption'>
              {timerTime}
            </Typography>
          </Typography>
        </Grid>
      )}

      {canInvoiceRepay && (
        <Box sx={sx.payBtnBlock}>
          <Button variant='outlined' sx={sx.payBtn} onClick={handleRepayClick}>
            {payButtonFields[payment.status as PayBtnKeys]}
          </Button>
        </Box>
      )}

      <Typography
        variant='h6'
        sx={{ ...sx.price, ...(!isInvoice && sx[payment.status as IWalletTransaction['type']]) }}
      >
        {cheeseCoinCount}&nbsp;{currencySymbol}
      </Typography>
    </Grid>
  );
}
