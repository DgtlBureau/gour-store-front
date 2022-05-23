import React from 'react';
import s from './LkOrdersCard.module.scss';
import translations from './LkOrdersCard.i18n.json';
import { useLocalTranslation } from '../../../hooks/useLocalTranslation';
import { Currency } from '../../../@types/entities/Currency';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Chip,
  Divider,
  Stack,
  Typography,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { OrderProductType, OrderProductCard } from './ProductCard';
import { OrderInfoCard } from './InfoCard';
import { getCurrencySymbol } from '../../../helpers/currencyHelper';
import { Box } from '@mui/system';
import { format } from 'date-fns';

export type LkOrdersCardProps = {
  title: string;
  status: {
    title: string;
    color: string;
  };
  createdAt: string;
  address: string;
  client: string;
  currency: Currency;
  products: OrderProductType[];
  promotions: {
    title: string;
    amount: number;
  }[];
  deliveryCost: number;
};

export function LkOrdersCard({
  title,
  address,
  client,
  createdAt,
  products,
  currency,
  promotions,
  deliveryCost,
}: LkOrdersCardProps) {
  const { t } = useLocalTranslation(translations);

  const productCount = products.length;
  const fullOrderPrice = products.reduce((acc, currentProduct) => {
    return (acc += currentProduct.cost);
  }, 0);

  const summaryDiscount = promotions.reduce((acc, currentDiscount) => {
    return (acc += currentDiscount.amount);
  }, 0);

  const priceWithDiscount = fullOrderPrice + deliveryCost - summaryDiscount;

  return (
    <div>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Stack
            sx={{ width: '100%' }}
            direction="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <Stack direction="row" alignItems="center" spacing={2}>
              <Typography variant="h6">{title}</Typography>
              <Chip label="Создан" color="primary" />
              <Typography variant="body1">{createdAt}</Typography>
            </Stack>
            <Stack direction="row" alignItems="center" spacing={2}>
              <Typography variant="body1">{productCount} товара</Typography>
              <Typography variant="h6">
                {priceWithDiscount} {getCurrencySymbol(currency)}
              </Typography>
            </Stack>
          </Stack>
        </AccordionSummary>
        <AccordionDetails>
          <div>
            <Typography>
              {t('deliveryAddress')}: {address}
            </Typography>
            <Typography>
              {t('receiver')}: {client}
            </Typography>
          </div>
          <Divider variant="fullWidth" sx={{ margin: '20px 0' }} />
          {products.map(product => (
            <OrderProductCard product={product} currency={currency} />
          ))}
          <Divider variant="fullWidth" />
          <OrderInfoCard
            fullPrice={fullOrderPrice}
            totalPrice={priceWithDiscount}
            summaryDiscount={summaryDiscount}
            promotions={promotions}
            deliveryCost={deliveryCost}
            currency={currency}
          />
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
