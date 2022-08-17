import React from 'react';
import { Grid } from '@mui/material';
import translations from './DiscountsCard.i18n.json';
import { useLocalTranslation } from '../../../../hooks/useLocalTranslation';
import { Typography } from '../../../UI/Typography/Typography';
import { InfoCard } from '../../../UI/Info/Card/Card';
import { DiscountItem } from './DiscountItem';

const sx = {
  discounts: {
    width: '100%',
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

export type PADiscountsCardProps = {
  discounts: {
    id: string;
    title: string;
    category: string;
    percent: number;
  }[];
  onClickMore(): void;
};

export function PADiscountsCard({ discounts, onClickMore }: PADiscountsCardProps) {
  const { t } = useLocalTranslation(translations);

  return (
    <InfoCard title={t('title')} footerText={t('footerText')} onClickMore={onClickMore}>
      {discounts.length !== 0 ? (
        <Grid sx={sx.discounts} container spacing={2}>
          {discounts.map(discount => (
            <DiscountItem key={discount.id} discount={discount} />
          ))}
        </Grid>
      ) : (
        <Typography variant='body1' color='text.muted'>
          {t('emptyDiscounts')}
        </Typography>
      )}
    </InfoCard>
  );
}
