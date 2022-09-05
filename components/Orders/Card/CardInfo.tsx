import React, { useMemo } from 'react';

import { Divider, Stack } from '@mui/material';
import { Typography } from 'components/UI/Typography/Typography';
import { Currency } from 'types/entities/Currency';
import { getCurrencySymbol } from 'helpers/currencyHelper';
import { useLocalTranslation } from 'hooks/useLocalTranslation';
import translations from './Card.i18n.json';
import { defaultTheme as theme } from 'themes';

const sx = {
  card: {
    background: theme.palette.background.paper,
    borderRadius: '6px',
    padding: {
      sm: '30px',
      xs: '20px',
    },
    margin: '20px 0 0 0',
  },
  price: {
    fontSize: '13px',
  },
  total: {
    fontSize: {
      xs: '16px',
      sm: '18px',
    },
    fontWeight: 'bold',
  },
  discount: {
    color: 'error.main',
  },
};

type OrderCardInfoProps = {
  fullPrice: number;
  summaryDiscount: number;
  totalPrice: number;
  promotions: {
    title: string;
    amount: number;
  }[];
  deliveryCost: number;
  currency: Currency;
};

export function OrderCardInfo({
  fullPrice,
  promotions,
  summaryDiscount,
  totalPrice,
  deliveryCost,
  currency,
}: OrderCardInfoProps) {
  const { t } = useLocalTranslation(translations);
  const currencySymbol = useMemo(() => getCurrencySymbol(currency), [currency]);
  return (
    <Stack sx={sx.card}>
      <Stack direction='row' alignItems='center' justifyContent='space-between'>
        <Typography variant='h6' sx={sx.total}>
          {t('goodsWorth')}
        </Typography>

        <Typography variant='h6' sx={sx.total}>
          {fullPrice} {getCurrencySymbol(currency)}
        </Typography>
      </Stack>

      {promotions.map((promotion, i) => (
        <Stack key={promotion.title} direction='row' alignItems='center' justifyContent='space-between'>
          <Typography variant='body2' sx={sx.price}>
            {promotion.title}
          </Typography>

          <Typography variant='body2' sx={{ ...sx.price, ...sx.discount }}>
            -{promotion.amount} {getCurrencySymbol(currency)}
          </Typography>
        </Stack>
      ))}

      <Divider variant='fullWidth' sx={{ margin: '10px 0' }} />

      {!!summaryDiscount && (
        <Stack direction='row' alignItems='center' justifyContent='space-between'>
          <Typography variant='body2' sx={{ ...sx.price, ...sx.discount }}>
            {t('economy')}
          </Typography>

          <Typography variant='body2' sx={{ ...sx.price, ...sx.discount }}>
            -{summaryDiscount} {currencySymbol}
          </Typography>
        </Stack>
      )}

      <Stack direction='row' alignItems='center' justifyContent='space-between'>
        <Typography variant='h6' sx={sx.total}>
          {t('total')}
        </Typography>

        <Typography variant='h6' sx={sx.total}>
          {totalPrice} {currencySymbol}
        </Typography>
      </Stack>

      <Stack direction='row' alignItems='center' justifyContent='space-between'>
        <Typography variant='body2' sx={sx.price}>
          {t('delivery')}
        </Typography>

        <Typography variant='body2' sx={sx.price}>
          {deliveryCost} {currencySymbol}
        </Typography>
      </Stack>
    </Stack>
  );
}
