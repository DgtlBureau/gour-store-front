import React from 'react';

import { Divider, Stack } from '@mui/material';
import { Typography } from '../../UI/Typography/Typography';
import { Currency } from '../../../@types/entities/Currency';
import { getCurrencySymbol } from '../../../helpers/currencyHelper';
import { useLocalTranslation } from '../../../hooks/useLocalTranslation';
import translations from './Card.i18n.json';

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

export const OrderCardInfo = ({
  fullPrice,
  promotions,
  summaryDiscount,
  totalPrice,
  deliveryCost,
  currency,
}: OrderCardInfoProps) => {
  const { t } = useLocalTranslation(translations);
  return (
    <Stack
      sx={{
        background: '#F8F8F8',
        borderRadius: '6px',
        padding: '30px',
        margin: '20px 0 0 0',
      }}
    >
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Typography variant="h6">{t('goodsWorth')}</Typography>
        <Typography variant="h6">
          {fullPrice} {getCurrencySymbol(currency)}
        </Typography>
      </Stack>
      {promotions.map(promotion => (
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Typography variant="body1">{promotion.title}</Typography>
          <Typography variant="body1" sx={{ color: '#f45725' }}>
            -{promotion.amount} {getCurrencySymbol(currency)}
          </Typography>
        </Stack>
      ))}
      <Divider variant="fullWidth" sx={{ margin: '10px 0' }} />
      {summaryDiscount && (
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Typography variant="body2" sx={{ color: '#f45725' }}>
            {t('economy')}
          </Typography>
          <Typography variant="body2" sx={{ color: '#f45725' }}>
            -{summaryDiscount} {getCurrencySymbol(currency)}
          </Typography>
        </Stack>
      )}
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Typography variant="h6">{t('total')}</Typography>
        <Typography variant="h6">
          {totalPrice} {getCurrencySymbol(currency)}
        </Typography>
      </Stack>
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Typography variant="body2">{t('delivery')}</Typography>
        <Typography variant="body2">
          {deliveryCost} {getCurrencySymbol(currency)}
        </Typography>
      </Stack>
    </Stack>
  );
};
