import React from 'react';
import { Typography, Grid } from '@mui/material';

import { formatDate } from 'helpers/dateHelper';
import { getCurrencySymbol, getFormattedPrice } from 'helpers/currencyHelper';
import { FullInvoice } from 'pages/personal-area/payments';
// import { useLocalTranslation } from 'hooks/useLocalTranslation';
// import translations from './Card.i18n.json';
import { getPayBtnFields, PayBtnKeys, paymentColorByStatus } from './CardHelper';

import sx from './Card.styles';
import { Button } from 'components/UI/Button/Button';
import { InvoiceStatus } from 'types/entities/IInvoice';
import { Box } from 'components/UI/Box/Box';
import { useTimer } from 'hooks/useTimer';

export type PaymentsCardProps = {
  payment: FullInvoice;
  refetch: () => void;
};

export function PaymentsCard({ payment, refetch }: PaymentsCardProps) {

  return <div>Card</div>;
  // const {  } = payment;

  // const { t } = useLocalTranslation(translations);

  const { timerTime } = useTimer(payment.expiresAt, /* refetch */ () => undefined); // TODO: вызывать refetch для обновления статуса заявки

  const invoiceStatus = paymentColorByStatus[payment.status];

  const cheeseCoinCount = getFormattedPrice(payment.cheeseCoinCount);
  const currencySymbol = getCurrencySymbol('cheeseCoin');

  const formattedDate = formatDate(payment.updatedAt, 'dd.MM.yyyy');
  const formattedTime = formatDate(payment.updatedAt, 'hh:mm');

  const canRepay = [InvoiceStatus.WAITING, InvoiceStatus.FAILED].includes(payment.status);
  const payBtnFields = getPayBtnFields(payment.status as PayBtnKeys);

  return (
    <Grid container sx={sx.container}>
      <Typography sx={sx.title} variant='h6'>
        Чизкоины
      </Typography>

      <Grid item sx={sx.statusBlock}>
        <Typography sx={{ ...sx.status, backgroundColor: invoiceStatus.color }}>{invoiceStatus.name}</Typography>

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
          <Button color='primary' sx={{ ...sx.generalPayBtn, ...sx[payBtnFields.className] }}>
            {payBtnFields.name}
          </Button>
        </Box>
      )}

      <Typography variant='h6' sx={sx.price}>
        {cheeseCoinCount}&nbsp;{currencySymbol}
      </Typography>
    </Grid>
  );
}
