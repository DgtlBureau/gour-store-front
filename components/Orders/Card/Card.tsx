import React, { useMemo } from 'react';
import { format } from 'date-fns';
import { Divider, Stack, Typography, Grid } from '@mui/material';

import translations from './Card.i18n.json';
import { useLocalTranslation } from '../../../hooks/useLocalTranslation';
import { Accordion, AccordionDetails, AccordionSummary } from '../../UI/Accordion/Accordion';
import { Box } from '../../UI/Box/Box';
import { OrderProductType, OrderCardProduct } from './CardProduct';
import { OrderCardInfo } from './CardInfo';
import { getCurrencySymbol } from '../../../helpers/currencyHelper';
import { Currency } from '../../../@types/entities/Currency';
import { getDeclensionWordByCount } from 'utils/wordHelper';

import sx from './Card.styles';

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
  onDetail: (id: number) => void;
};

export function OrdersCard({ order, onDetail }: OrdersCardProps) {
  const { title, status, createdAt, address, currency, client, products, promotions, deliveryCost } = order;

  const { t } = useLocalTranslation(translations);

  const productCount = products.length;
  const fullOrderPrice = products.reduce((acc, currentProduct) => {
    if (!currentProduct.isWeightGood) {
      return (acc += currentProduct.cost * currentProduct.amount);
    }
    return (acc += (currentProduct.cost * currentProduct.weight) / 100);
  }, 0);

  const productsCountText = getDeclensionWordByCount(productCount, [
    t('manyProducts'),
    t('oneProduct'),
    t('someProducts'),
  ]);

  const createdDate = format(createdAt, 'yyyy.MM.d');
  const createdTime = format(createdAt, 'HH:mm');

  const summaryDiscount = promotions.reduce((acc, currentDiscount) => (acc += currentDiscount.amount), 0);

  const currencySymbol = useMemo(() => getCurrencySymbol(currency), [currency]);

  const priceWithDiscount = fullOrderPrice + deliveryCost - summaryDiscount;

  return (
    <Accordion>
      <AccordionSummary>
        <Stack
          sx={sx.header}
          direction={{ xs: 'column', sm: 'row' }}
          alignItems={{ xs: 'none', sm: 'center' }}
          justifyContent={{ xs: 'none', sm: 'space-between' }}
          spacing={2}
        >
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="h6">{title}</Typography>

            <Typography sx={{ ...sx.total, display: { xs: 'flex', sm: 'none' } }} variant="h6">
              {priceWithDiscount} {currencySymbol}
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography sx={{ ...sx.status, backgroundColor: status.color }}>{status.title}</Typography>

            <Typography variant="body1" sx={sx.muted}>
              {t('from')} {createdDate} {t('at')} {createdTime}
            </Typography>
          </Box>

          <Typography variant="body1" sx={sx.muted}>
            {productCount} {productsCountText}
          </Typography>

          <Typography sx={{ ...sx.total, display: { xs: 'none', sm: 'flex' } }} variant="h6">
            {priceWithDiscount} {currencySymbol}
          </Typography>
        </Stack>
      </AccordionSummary>

      <Divider variant="fullWidth" sx={{ margin: '20px 0 0 0' }} />

      <AccordionDetails>
        <Box sx={sx.contacts}>
          <Typography sx={sx.muted} variant="body1">
            {t('deliveryAddress')}:&nbsp;
          </Typography>

          <Typography variant="body1">{address}</Typography>
        </Box>

        <Box sx={sx.contacts}>
          <Typography sx={sx.muted} variant="body1">
            {t('receiver')}:&nbsp;
          </Typography>
          <Typography variant="body1">{client}</Typography>
        </Box>

        <Divider variant="fullWidth" sx={{ margin: '20px 0 0 0' }} />

        {products.map(product => (
          <OrderCardProduct
            key={`${product.amount}_${product.photo}`}
            product={product}
            currency={currency}
            onDetail={onDetail}
          />
        ))}

        {!!products.length && <Divider variant="fullWidth" />}

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
