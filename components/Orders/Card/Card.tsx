import React, { useMemo } from 'react';
import translations from './Card.i18n.json';
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
import { OrderProductType, OrderCardProduct } from './CardProduct';
import { OrderCardInfo } from './CardInfo';
import { getCurrencySymbol } from '../../../helpers/currencyHelper';
import { format } from 'date-fns';

type Promotion = {
  title: string;
  amount: number;
};

export type OrdersCardProps = {
  title: string;
  status: {
    title: string;
    color: string;
  };
  createdAt: Date;
  address: string;
  client: string;
  currency: Currency;
  products: OrderProductType[];
  promotions: Promotion[];
  deliveryCost: number;
};

export function OrdersCard({
  title,
  address,
  client,
  createdAt,
  products,
  currency,
  promotions,
  deliveryCost,
}: OrdersCardProps) {
  const { t } = useLocalTranslation(translations);

  const productCount = products.length;
  const fullOrderPrice = products.reduce((acc, currentProduct) => {
    if (!currentProduct.isWeightGood) {
      return (acc += currentProduct.cost * currentProduct.amount);
    }
    return (acc += (currentProduct.cost * currentProduct.weight) / 100);
  }, 0);

  const createdDate = format(createdAt, 'yyyy.MM.d');
  const createdTime = format(createdAt, 'HH:mm');

  const summaryDiscount = promotions.reduce(
    (acc, currentDiscount) => (acc += currentDiscount.amount),
    0
  );

  const currencySymbol = useMemo(() => getCurrencySymbol(currency), [currency]);

  const priceWithDiscount = fullOrderPrice + deliveryCost - summaryDiscount;

  return (
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
            <Typography variant="body1">
              {t('from')} {createdDate} {t('at')} {createdTime}
            </Typography>
          </Stack>
          <Stack direction="row" alignItems="center" spacing={2}>
            <Typography variant="body1">{productCount} товара</Typography>
            <Typography
              sx={{ width: '250px', textAlign: 'right' }}
              variant="h6"
            >
              {priceWithDiscount} {currencySymbol}
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
          <OrderCardProduct
            key={`${product.amount}_${product.photo}`}
            product={product}
            currency={currency}
          />
        ))}
        <Divider variant="fullWidth" />
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
