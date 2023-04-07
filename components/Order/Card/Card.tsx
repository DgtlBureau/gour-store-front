import React from 'react';

import { Stack, SxProps } from '@mui/material';

import { Box } from 'components/UI/Box/Box';
import { Typography } from 'components/UI/Typography/Typography';

import { IOrderProduct } from 'types/entities/IOrderProduct';
import { Language } from 'types/entities/Language';

import { useLocalTranslation } from 'hooks/useLocalTranslation';
import { getCurrencySymbol, getPriceByGrams } from 'utils/currencyUtil';
import { getDeclensionWordByCount } from 'utils/wordUtil';

import translation from './Card.i18n.json';

import cardSx from './Card.styles';
import { getPriceByRole } from '../../../types/entities/IPrice';
import { useGetCurrentUserQuery } from '../../../store/api/currentUserApi';

type OrderProductInfoItemProps = {
  title: string;
  price: number;
  amountText: string;
  currencySymbol: JSX.Element;
};

function OrderProductInfoItem({ title, price, amountText, currencySymbol }: OrderProductInfoItemProps) {
  return (
    <Box sx={cardSx.field}>
      <Typography variant='body1' sx={cardSx.product}>
        {title}
      </Typography>

      <Box sx={cardSx.fieldPrice}>
        <Typography variant='body1' sx={cardSx.product}>
          {price} {currencySymbol}
        </Typography>
        <Typography variant='body1' sx={cardSx.product}>
          • {amountText}
        </Typography>
      </Box>
    </Box>
  );
}

type OrderSumItemProps = {
  title: string;
  value: number;
  isTotal?: boolean;
  currencySymbol: JSX.Element;
};

function OrderSumItem({ title, value, isTotal, currencySymbol }: OrderSumItemProps) {
  const { t } = useLocalTranslation(translation);

  const isFree = value === 0;
  const isDiscount = value < 0;

  const variant = isTotal ? 'h6' : 'body1';
  const textSx = { ...cardSx.sumItemText, ...(isTotal && cardSx.totalText) };
  const valueTextSx = { ...textSx, ...(isDiscount && cardSx.discountText), ...(isFree && cardSx.freeText) };

  return (
    <Box sx={cardSx.sumItem}>
      <Typography variant={variant} sx={textSx}>
        {title}
      </Typography>
      <Typography variant={variant} sx={valueTextSx}>
        {isFree ? (
          t('free')
        ) : (
            <>
              {value}&nbsp;
              {currencySymbol}
            </>
        )}
      </Typography>
    </Box>
  );
}

type OrderCardProps = {
  products: Pick<IOrderProduct, 'amount' | 'product' | 'gram'>[];
  cost: number;
  promotionsDiscount?: number;
  promoCodeDiscount?: number;
  referralCodeDiscount?: number;
  delivery: number;
  language: Language;
  sx?: SxProps;
  isByCash: boolean;
};

export function OrderCard({
  products,
  cost,
  promotionsDiscount = 0,
  promoCodeDiscount = 0,
  referralCodeDiscount = 0,
  delivery,
  language,
  sx,
  isByCash
}: OrderCardProps) {
  const { t } = useLocalTranslation(translation);

  const currencySymbol = getCurrencySymbol();
  const { data: currentUser } = useGetCurrentUserQuery();

  const productInfo = products.map(product => {
    const priceByGram = getPriceByGrams(
        getPriceByRole(product.product.price, currentUser?.role, isByCash), product.gram
    ) * product.amount;

    return {
      id: product.product.id,
      title: product.product.title[language],
      price: priceByGram,
      amount: `${product.amount} ${t('piece')}`,
    };
  });

  const productCount = products.length;

  const discountSum = promotionsDiscount + (promoCodeDiscount || referralCodeDiscount);
  const total = cost + delivery - discountSum;

  const productsCountText = getDeclensionWordByCount(productCount, [
    t('manyProducts'),
    t('oneProduct'),
    t('someProducts'),
  ]);

  return (
    <Stack sx={{ ...cardSx.card, ...sx }}>
      <Typography sx={cardSx.count} variant='h6'>
        {productCount} {productsCountText} {t('inOrder')}
      </Typography>

      {productInfo.map(({ id, title, price, amount }) => (
        <OrderProductInfoItem
          key={id}
          title={title}
          price={price}
          amountText={amount}
          currencySymbol={currencySymbol}
        />
      ))}

      <Stack sx={cardSx.footer}>
        <OrderSumItem title={t('cost')} value={cost} currencySymbol={currencySymbol} />

        {!!promotionsDiscount && (
          <OrderSumItem title={t('promotions')} value={-promotionsDiscount} currencySymbol={currencySymbol} />
        )}

        {promoCodeDiscount ? (
          <OrderSumItem title={t('promoCode')} value={-promoCodeDiscount} currencySymbol={currencySymbol} />
        ) : (
          !!referralCodeDiscount && (
            <OrderSumItem title={t('referralCode')} value={-referralCodeDiscount} currencySymbol={currencySymbol} />
          )
        )}

        <OrderSumItem title={t('delivery')} value={delivery} currencySymbol={currencySymbol} />

        <OrderSumItem isTotal title={t('total')} value={total} currencySymbol={currencySymbol} />
      </Stack>
    </Stack>
  );
}
