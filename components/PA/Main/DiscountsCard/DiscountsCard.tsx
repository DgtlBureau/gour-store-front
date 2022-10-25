import React from 'react';

import { Grid } from '@mui/material';

import PALoader from 'components/PA/Main/Loader';
import { InfoCard } from 'components/UI/Info/Card/Card';
import { Typography } from 'components/UI/Typography/Typography';

import { useLocalTranslation } from 'hooks/useLocalTranslation';

import { Path } from 'constants/routes';
import { formatCategoriesWithMaxDiscount } from 'pages/personal-area/personalAreaHelper';

import { DiscountItem } from './DiscountItem';
import translations from './DiscountsCard.i18n.json';

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
  discounts: ReturnType<typeof formatCategoriesWithMaxDiscount>;
  isLoading: boolean;
};

export function PADiscountsCard({ discounts, isLoading }: PADiscountsCardProps) {
  const { t } = useLocalTranslation(translations);

  return (
    <InfoCard title={t('title')} footerText={t('footerText')} href={`/${Path.PERSONAL_AREA}/${Path.DISCOUNTS}`}>
      {isLoading && <PALoader />}

      {!!discounts.length && (
        <Grid sx={sx.discounts} container spacing={2}>
          {discounts.map(discount => (
            <DiscountItem key={discount.id} discount={discount} />
          ))}
        </Grid>
      )}

      {!isLoading && !discounts.length && (
        <Typography variant='body1' color='text.muted'>
          {t('emptyDiscounts')}
        </Typography>
      )}
    </InfoCard>
  );
}
