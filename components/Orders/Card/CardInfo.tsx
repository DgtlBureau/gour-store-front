import React, { useMemo } from 'react';

import { Divider, Stack } from '@mui/material';

import { Typography } from 'components/UI/Typography/Typography';

import { useLocalTranslation } from 'hooks/useLocalTranslation';
import { getCurrencySymbol } from 'utils/currencyUtil';

import { color } from 'themes';

import translations from './Card.i18n.json';

const sx = {
  card: {
    background: color.secondary,
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
  totalSum: number;
  summaryDiscount: number;
  promotions: {
    title: string;
    amount: number;
  }[];
};

export function OrderCardInfo({ totalSum, promotions, summaryDiscount }: OrderCardInfoProps) {
  const { t } = useLocalTranslation(translations);
  const currencySymbol = getCurrencySymbol();
  return (
    <Stack sx={sx.card}>
      <Stack direction='row' alignItems='center' justifyContent='space-between'>
        <Typography variant='h6' sx={sx.total}>
          {t('goodsWorth')}
        </Typography>

        <Typography variant='h6' sx={sx.total}>
          {totalSum} {currencySymbol}
        </Typography>
      </Stack>

      {promotions.map(
        promotion =>
          promotion.title && (
            <Stack
              key={`${promotion.title}${promotion.amount}`}
              direction='row'
              alignItems='center'
              justifyContent='space-between'
            >
              <Typography variant='body2' sx={sx.price}>
                {promotion.title}
              </Typography>

              <Typography variant='body2' sx={{ ...sx.price, ...sx.discount }}>
                -{promotion.amount} {currencySymbol}
              </Typography>
            </Stack>
          ),
      )}

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
          {totalSum} {currencySymbol}
        </Typography>
      </Stack>

      {/* <Stack direction='row' alignItems='center' justifyContent='space-between'>
        <Typography variant='body2' sx={sx.price}>
          {t('delivery')}
        </Typography>

        <Typography variant='body2' sx={sx.price}>
          {deliveryCost} {currencySymbol}
        </Typography>
      </Stack> */}
    </Stack>
  );
}
