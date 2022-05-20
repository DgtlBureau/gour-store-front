import React from 'react';
import { format } from 'date-fns';

import translations from './OrdersCard.i18n.json';
import { useLocalTranslation } from '../../../hooks/useLocalTranslation';
import { getCurrencySymbol } from '../../../helpers/currencyHelper';
import { Box } from '../../UI/Box/Box';
import { Typography } from '../../UI/Typography/Typography';
import { BaseInformationCard } from '../../UI/BaseInformationCard/BaseInformationCard';

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
  },
  orderId: {
    marginRight: '12px',
  },
};

export type LkMainOrdersCardProps = {
  orders: {
    id: string;
    date: Date;
    status: string;
    sum: number;
    currency: 'rub' | 'eur' | 'usd';
  }[];
  onClickMore(): void;
};

export function LkMainOrdersCard({
  orders,
  onClickMore,
}: LkMainOrdersCardProps) {
  const { t } = useLocalTranslation(translations);

  return (
    <BaseInformationCard
      title={t('title')}
      footerText={t('footerText')}
      onClickMore={onClickMore}
    >
      {orders.map(order => (
        <Box key={order.id} sx={sx.order}>
          <Box sx={sx.orderHeader}>
            <Box sx={sx.orderTitle}>
              <Typography variant="body1" sx={sx.orderId}>
                {t('order')} {order.id}
              </Typography>
              <Typography variant="body1" color="text.muted">
                {t('from')} {format(order.date, 'dd.MM.yyyy')}
              </Typography>
            </Box>

            <Typography variant="body1">
              {order.sum}
              {getCurrencySymbol(order.currency)}
            </Typography>
          </Box>

          <Typography variant="body2" color="text.muted">
            {order.status}
          </Typography>
        </Box>
      ))}
    </BaseInformationCard>
  );
}
