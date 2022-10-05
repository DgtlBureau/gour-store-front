import React from 'react';

import { Grid, Typography } from '@mui/material';

import { Box } from 'components/UI/Box/Box';
import { Button } from 'components/UI/Button/Button';

import { InvoiceStatus } from 'types/entities/IInvoice';

import { useTimer } from 'hooks/useTimer';
import { getCurrencySymbol, getFormattedPrice } from 'utils/currencyUtil';
import { formatDate } from 'utils/dateUtil';

import { FullInvoice } from 'pages/personal-area/payments';

import sx from './Card.styles';
import { PayBtnKeys, payButtonFields, paymentColorByStatus } from './CardHelper';

export type PaymentsCardProps = {
  payment: FullInvoice;
  refetch: () => void;
};

export function PaymentsCard({ payment, refetch: _refetch }: PaymentsCardProps) {
  const { timerTime } = useTimer(payment.expiresAt, /* refetch */ () => undefined); // TODO: вызывать refetch для обновления статуса заявки

  const invoiceStatus = paymentColorByStatus[payment.status];

  const cheeseCoinCount = getFormattedPrice(payment.cheeseCoinCount);
  const currencySymbol = getCurrencySymbol('cheeseCoin');

  const formattedDate = formatDate(payment.updatedAt, 'dd.MM.yyyy');
  const formattedTime = formatDate(payment.updatedAt, 'hh:mm');

  const canRepay = [InvoiceStatus.WAITING, InvoiceStatus.FAILED].includes(payment.status);

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
