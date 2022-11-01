import React from 'react';

import { Grid, Typography } from '@mui/material';

import { Box } from 'components/UI/Box/Box';
import { Button } from 'components/UI/Button/Button';

import { InvoiceStatus } from 'types/entities/IInvoice';

import { useTimer } from 'hooks/useTimer';
import { getCurrencySymbol, getFormattedPrice } from 'utils/currencyUtil';
import { formatDate } from 'utils/dateUtil';

import { ru as ruLocale } from 'date-fns/locale';
import { FullInvoice } from 'pages/personal-area/payments';

import sx from './Card.styles';
import { PayBtnKeys, payButtonFields, paymentColorByStatus } from './CardHelper';

export type PaymentsCardProps = {
  payment: FullInvoice;
  refetch: () => void;
};

export function PaymentsCard({ payment, refetch }: PaymentsCardProps) {
  const canRepay = [InvoiceStatus.WAITING, InvoiceStatus.FAILED].includes(payment.status);

  const { timerTime } = useTimer(payment.expiresAt, { onEnd: refetch, needCount: canRepay });

  const invoiceStatus = paymentColorByStatus[payment.status];

  const cheeseCoinCount = getFormattedPrice(payment.cheeseCoinCount);
  const currencySymbol = getCurrencySymbol('cheeseCoin');

  const formattedDate = formatDate(payment.updatedAt, 'dd.MM.yyyy', { locale: ruLocale });
  const formattedTime = formatDate(payment.updatedAt, 'H:mm', { locale: ruLocale });

  return (
    <Grid container sx={sx.container}>
      <Typography sx={sx.title} variant='h6'>
        Чизкоины
      </Typography>

      <Grid item sx={sx.statusBlock}>
        <Typography sx={{ ...sx.status, ...sx[invoiceStatus.className] }}>{invoiceStatus.name}</Typography>

        <Typography variant='body1' sx={sx.statusDate}>
          от&nbsp;{formattedDate} в&nbsp;{formattedTime}
        </Typography>
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

      <Typography variant='h6' sx={sx.price}>
        {cheeseCoinCount}&nbsp;{currencySymbol}
      </Typography>
    </Grid>
  );
}
