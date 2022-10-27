import React, { useMemo } from 'react';

import { format } from 'date-fns';

import { Divider, Grid, Typography } from '@mui/material';

import { Accordion, AccordionDetails, AccordionSummary } from 'components/UI/Accordion/Accordion';
import { Box } from 'components/UI/Box/Box';

import { Currency } from 'types/entities/Currency';

import { useLocalTranslation } from 'hooks/useLocalTranslation';
import { getCurrencySymbol } from 'utils/currencyUtil';
import { getDeclensionWordByCount } from 'utils/wordUtil';

import translations from './Card.i18n.json';
import sx from './Card.styles';
import { OrderCardInfo } from './CardInfo';
import { OrderCardProduct, OrderProductType } from './CardProduct';

type Promotion = {
  title: string;
  amount: number;
};

export type FullOrder = {
  title: string;
  status: {
    title: string;
    color: string;
  };
  createdAt: Date;
  address: string;
  client: string;
  products: OrderProductType[];
  promotions: Promotion[];
  deliveryCost: number;
  currency: Currency;
};

export type OrdersCardProps = {
  order: FullOrder;
};

export function OrdersCard({ order }: OrdersCardProps) {
  const { title, status, createdAt, address, currency, client, products, promotions, deliveryCost } = order;

  const { t } = useLocalTranslation(translations);

  const productCount = products.length;
  const fullOrderPrice = products.reduce((acc, currentProduct) => acc + currentProduct.cost * currentProduct.amount, 0);

  const productsCountText = getDeclensionWordByCount(productCount, [
    t('manyProducts'),
    t('oneProduct'),
    t('someProducts'),
  ]);

  const createdDate = format(createdAt, 'dd.MM.yyyy');
  const createdTime = format(createdAt, 'HH:mm');

  const summaryDiscount = promotions.reduce((acc, currentDiscount) => acc + currentDiscount.amount, 0);

  const currencySymbol = useMemo(() => getCurrencySymbol(currency), [currency]);

  const priceWithDiscount = fullOrderPrice + deliveryCost - summaryDiscount;

  return (
    <Accordion>
      <AccordionSummary>
        <Grid container sx={sx.header}>
          <Grid item sm={3} xs={12} sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant='h6'>{`Заказ ${title}`}</Typography>

            <Box sx={{ ...sx.total, display: { xs: 'flex', sm: 'none' } }}>
              <Typography variant='h6' sx={sx.totalText}>
                {priceWithDiscount} {currencySymbol}
              </Typography>
            </Box>
          </Grid>

          <Grid item sm={5} xs={12} sx={{ display: 'flex', alignItems: 'center', margin: { xs: '5px 0' } }}>
            <Typography sx={{ ...sx.status, backgroundColor: status.color || 'secondary.main' }}>
              {status.title || 'ожидание'}
            </Typography>

            <Typography variant='body1' sx={sx.muted}>
              {t('from')} {createdDate} {t('at')} {createdTime}
            </Typography>
          </Grid>

          <Grid item sm={2} xs={12}>
            <Typography variant='body1' sx={{ ...sx.muted, ...sx.count }}>
              {productCount} {productsCountText}
            </Typography>
          </Grid>

          <Grid item sm={2} xs={12} sx={{ ...sx.total, display: { xs: 'none', sm: 'flex' } }}>
            <Typography variant='h6' sx={sx.totalText}>
              {priceWithDiscount} {currencySymbol}
            </Typography>
          </Grid>
        </Grid>
      </AccordionSummary>

      <Divider variant='fullWidth' sx={{ margin: '20px 0 0 0' }} />

      <AccordionDetails>
        <Box sx={sx.contacts}>
          <Typography sx={sx.muted} variant='body1'>
            {t('deliveryAddress')}:&nbsp;
          </Typography>

          <Typography variant='body1'>{address}</Typography>
        </Box>

        <Box sx={sx.contacts}>
          <Typography sx={sx.muted} variant='body1'>
            {t('receiver')}:&nbsp;
          </Typography>
          <Typography variant='body1'>{client}</Typography>
        </Box>

        <Divider variant='fullWidth' sx={{ margin: '20px 0 0 0' }} />

        {products.map(product => (
          <OrderCardProduct key={`${product.amount}_${product.photo}`} product={product} currency={currency} />
        ))}

        {!!products.length && <Divider variant='fullWidth' />}

        <OrderCardInfo
          fullPrice={fullOrderPrice}
          totalPrice={priceWithDiscount}
          summaryDiscount={summaryDiscount}
          promotions={promotions}
          deliveryCost={deliveryCost}
          currency={currency}
        />
      </AccordionDetails>
    </Accordion>
  );
}
