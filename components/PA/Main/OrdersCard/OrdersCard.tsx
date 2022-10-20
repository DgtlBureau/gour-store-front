import React from 'react';

import { Path } from 'constants/routes';
import { format } from 'date-fns';

import PALoader from 'components/PA/Main/Loader';
import { Box } from 'components/UI/Box/Box';
import { InfoCard } from 'components/UI/Info/Card/Card';
import { Typography } from 'components/UI/Typography/Typography';

import { Currency } from 'types/entities/Currency';

import { useLocalTranslation } from 'hooks/useLocalTranslation';
import { getCurrencySymbol } from 'utils/currencyUtil';

import translations from './OrdersCard.i18n.json';

const sx = {
  order: {
    marginBottom: '18px',
  },
  orderHeader: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  orderTitle: {
    display: 'flex',
    flexDirection: {
      sm: 'row',
      xs: 'column',
    },
  },
  orderId: {
    marginRight: '12px',
  },
};

export type PAOrdersCardProps = {
  orders: {
    id: string;
    date: Date;
    status: string;
    sum: number;
    currency: Currency;
  }[];
  isLoading: boolean;
};

export function PAOrdersCard({ orders, isLoading }: PAOrdersCardProps) {
  const { t } = useLocalTranslation(translations);

  return (
    <InfoCard title={t('title')} footerText={t('footerText')} href={`/${Path.PERSONAL_AREA}/${Path.ORDERS}`}>
      {isLoading && <PALoader />}

      {orders.map(order => (
        <Box key={order.id} sx={sx.order}>
          <Box sx={sx.orderHeader}>
            <Box sx={sx.orderTitle}>
              <Typography variant='body1' sx={sx.orderId}>
                {t('order')} {order.id}
              </Typography>
              <Typography variant='body1' color='text.muted'>
                {t('from')} {format(order.date, 'dd.MM.yyyy')}
              </Typography>
            </Box>

            <Typography variant='body1'>
              {order.sum}
              {getCurrencySymbol(order.currency)}
            </Typography>
          </Box>

          <Typography variant='body2' color='text.muted'>
            {order.status}
          </Typography>
        </Box>
      )) || 12345}

      {!isLoading && !orders.length && (
        <Typography variant='body1' color='text.muted'>
          {t('emptyOrders')}
        </Typography>
      )}
    </InfoCard>
  );
}
