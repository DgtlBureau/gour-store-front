import Image from 'next/image';
import React from 'react';

import { Grid, Tooltip, Typography } from '@mui/material';

import { Box } from 'components/UI/Box/Box';
import { Button } from 'components/UI/Button/Button';

import { InvoiceStatus } from 'types/entities/IInvoice';
import { IWalletTransaction } from 'types/entities/IWalletTransaction';

import { useTimer } from 'hooks/useTimer';
import { getCurrencySymbol, getFormattedPrice } from 'utils/currencyUtil';
import { formatDate } from 'utils/dateUtil';

import tooltipIcon from 'assets/icons/general/tooltip.svg';
import { ru as ruLocale } from 'date-fns/locale';
import { FullInvoice, PaymentTabs } from 'pages/personal-area/payments';

import styles from './Card.module.css';
import sx from './Card.styles';
import { PayBtnKeys, payButtonFields, paymentColorByStatus } from './CardHelper';

export type PaymentsCardProps = {
  payment: FullInvoice;
  type: PaymentTabs;
  refetch: () => void;
};

export function PaymentsCard({ payment, type, refetch }: PaymentsCardProps) {
  const canRepay = [InvoiceStatus.WAITING, InvoiceStatus.FAILED].includes(payment.status as InvoiceStatus);

  const isInvoice = type === PaymentTabs.INVOICE;

  const { timerTime } = useTimer(payment.expiresAt || new Date(), { onEnd: refetch, needCount: canRepay && isInvoice });

  const invoiceStatus = paymentColorByStatus[payment.status];

  const cheeseCoinCount = getFormattedPrice(payment.cheeseCoinCount);
  const currencySymbol = getCurrencySymbol('cheeseCoin');

  const formattedDate = formatDate(payment.updatedAt, 'dd.MM.yyyy', { locale: ruLocale });
  const formattedTime = formatDate(payment.updatedAt, 'H:mm', { locale: ruLocale });

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

      {canRepay && timerTime && (
        <Grid item sx={sx.timer}>
          <Typography sx={sx.timerLabel}>
            до отмены платежа&ensp;
            <Typography sx={sx.timerValue} variant='caption'>
              {timerTime}
            </Typography>
          </Typography>
        </Grid>
      )}

      {canRepay && (
        <Box sx={sx.payBtnBlock}>
          <Button variant='outlined' sx={sx.payBtn}>
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
